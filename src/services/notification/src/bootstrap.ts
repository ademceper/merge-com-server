import './instrument';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  BullMqService,
  getErrorInterceptor,
  // biome-ignore lint/style/noRestrictedImports: <explanation> x
  Logger,
  PinoLogger,
  RequestLogRepository,
} from 'libs/application-generic';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import { ResponseInterceptor } from './app/shared/framework/response.interceptor';
import { setupSwagger } from './app/shared/framework/swagger/swagger.controller';

import { RequestIdMiddleware } from './app/shared/middleware/request-id.middleware';

import { AppModule } from './app.module';
import { CONTEXT_PATH, corsOptionsDelegate, validateEnv } from './config';
import { AllExceptionsFilter } from './exception-filter';
import { InMemoryIoAdapter } from './app/socket/framework/in-memory-io.adapter';
import {
  prepareAppInfra as prepareWorkerInfra,
  startAppInfra as startWorkerInfra,
} from './app/worker-workflow/services/cold-start.service';
import {
  prepareAppInfra as prepareWsInfra,
  startAppInfra as startWsInfra,
} from './app/socket/services';
import passport from 'passport';
import compression from 'compression';

const extendedBodySizeRoutes = [
  '/v1/events',
  '/v1/notification-templates',
  '/v1/workflows',
  '/v1/layouts',
  '/v1/bridge/sync',
  '/v1/bridge/diff',
  '/v1/environments/:environmentId/bridge',
  '/v2/workflows',
];

// Validate the ENV variables after launching SENTRY, so missing variables will report to sentry.
validateEnv();
export async function bootstrap(): Promise<{ app: INestApplication; document: any }> {
  BullMqService.haveProInstalled();

  let rawBodyBuffer: undefined | ((...args) => void);
  let nestOptions: Record<string, boolean> = {};

  if (process.env.NOVU_ENTERPRISE === 'true' || process.env.CI_EE_TEST === 'true') {
    rawBodyBuffer = (_req, _res, buffer, _encoding): void => {
      if (buffer?.length) {
        // eslint-disable-next-line no-param-reassign
        (_req as any).rawBody = Buffer.from(buffer);
      }
    };
    nestOptions = {
      bodyParser: false,
      rawBody: true,
    };
  }

  const app = await NestFactory.create(AppModule, { bufferLogs: true, ...nestOptions });

  // Add a raw test route before any middleware to verify Express works
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/ping', (_req, res) => res.json({ pong: true }));

  // WebSocket adapter setup
  try {
    const inMemoryAdapter = new InMemoryIoAdapter(app);
    await inMemoryAdapter.connectToInMemoryCluster();
    app.useWebSocketAdapter(inMemoryAdapter);
  } catch (e) {
    console.error('WebSocket adapter setup failed (non-fatal):', e?.message);
  }

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: `${CONTEXT_PATH}v`,
    defaultVersion: '1',
  });

  const logger = await app.resolve(PinoLogger);
  logger.setContext('Bootstrap');

  app.useLogger(app.get(Logger));
  app.flushLogs();

  const server = app.getHttpServer();
  logger.trace(`Server timeout: ${server.timeout}`);
  server.keepAliveTimeout = 61 * 1000;
  logger.trace(`Server keepAliveTimeout: ${server.keepAliveTimeout / 1000}s `);
  server.headersTimeout = 65 * 1000;
  logger.trace(`Server headersTimeout: ${server.headersTimeout / 1000}s `);

  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production',
    })
  );
  app.enableCors(corsOptionsDelegate);

  app.use(passport.initialize());

  // Apply transaction ID middleware early in the request lifecycle
  const transactionIdMiddleware = new RequestIdMiddleware();
  app.use((req, res, next) => transactionIdMiddleware.use(req, res, next));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(getErrorInterceptor());

  app.use(extendedBodySizeRoutes, bodyParser.json({ limit: '26mb' }));
  app.use(extendedBodySizeRoutes, bodyParser.urlencoded({ limit: '26mb', extended: true }));

  // Add text/plain parser specifically for inbound webhooks (SNS confirmations)
  app.use(
    '/v2/inbound-webhooks/delivery-providers/:environmentId/:integrationId',
    bodyParser.text({ verify: rawBodyBuffer })
  );

  app.use((req, res, next) => {
    if (req.path.startsWith('/v1/better-auth')) {
      return next();
    }

    return bodyParser.json({ verify: rawBodyBuffer })(req, res, next);
  });

  app.use((req, res, next) => {
    if (req.path.startsWith('/v1/better-auth')) {
      return next();
    }

    return bodyParser.urlencoded({ extended: true, verify: rawBodyBuffer })(req, res, next);
  });

  app.use(
    compression({
      filter: (req, res) => {
        // the compression middleware buffers the response to compress it, which breaks SSE streaming
        if (res.getHeader('Content-Type') === 'text/event-stream') {
          return false;
        }

        return compression.filter(req, res);
      },
    })
  );

  const document = await setupSwagger(app);

  app.useGlobalFilters(new AllExceptionsFilter(app.get(Logger), app.get(RequestLogRepository)));

  /*
   * Handle unhandled promise rejections.
   * In production we crash because the app may be in an undefined state.
   * In development we only log to avoid crashes from transient Redis/Mongo reconnections.
   */
  process.on('unhandledRejection', (reason, promise) => {
    if (process.env.NODE_ENV === 'production') {
      logger.fatal({
        err: reason,
        message: 'Unhandled promise rejection',
        promise,
      });
      process.exit(1);
    } else {
      logger.error({
        err: reason,
        message: 'Unhandled promise rejection (non-fatal in dev)',
      });
    }
  });

  // Start listening first so the app is reachable (health checks, Swagger, etc.)
  await app.listen(process.env.PORT || 3010, '0.0.0.0');

  logger.info(`HTTP server listening on port ${process.env.PORT || 3010}`);

  // Pause and then enable workers after app is already listening
  try {
    await prepareWorkerInfra(app);
    await startWorkerInfra(app);
  } catch (e) {
    logger.error({ err: e, message: 'Failed to start worker infra' });
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }

  try {
    await prepareWsInfra(app);
    await startWsInfra(app);
  } catch (e) {
    logger.error({ err: e, message: 'Failed to start WS infra' });
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }

  app.enableShutdownHooks();

  logger.info(`Started application in NODE_ENV=${process.env.NODE_ENV} on port ${process.env.PORT}.`);

  return { app, document };
}
