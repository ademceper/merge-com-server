import type { INestApplication } from '@nestjs/common';

function isDevelopmentEnvironment(): boolean {
  return ['test', 'local', 'dev', 'development'].includes(process.env.NODE_ENV || '');
}

/**
 * CORS callback — must be a function (not a static object) so that
 * `process.env.NODE_ENV` is read at **request time**, after dotenv has loaded.
 */
export const corsOptionsDelegate: Parameters<INestApplication['enableCors']>[0] = (
  req: Request,
  callback: (err: Error | null, options: any) => void
) => {
  if (isDevelopmentEnvironment()) {
    callback(null, {
      origin: true,
      credentials: true,
      methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    });

    return;
  }

  const requestOrigin = (req.headers as any)?.origin || '';
  const allowedOrigins: string[] = [];

  if (process.env.FRONT_BASE_URL) {
    allowedOrigins.push(process.env.FRONT_BASE_URL);
  }
  if (process.env.WIDGET_BASE_URL) {
    allowedOrigins.push(process.env.WIDGET_BASE_URL);
  }
  if (process.env.DOCS_BASE_URL) {
    allowedOrigins.push(process.env.DOCS_BASE_URL);
  }

  callback(null, {
    origin: allowedOrigins.includes(requestOrigin) ? requestOrigin : false,
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    maxAge: 86400,
  });
};
