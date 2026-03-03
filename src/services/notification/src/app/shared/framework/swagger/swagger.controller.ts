import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { OpenAPIObject } from '@nestjs/swagger';
import type { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { API_KEY_SWAGGER_SECURITY_NAME } from 'libs/application-generic';
import packageJson from '../../../../../package.json';
import metadata from '../../../../metadata';
import { webhookEvents } from '../../../outbound-webhooks/webhooks.const';
import { injectDocumentComponents } from './injection';

export const API_KEY_SECURITY_DEFINITIONS: SecuritySchemeObject = {
  type: 'apiKey',
  name: 'Authorization',
  in: 'header',
  description: 'API key authentication. Allowed headers-- "Authorization: ApiKey <secret_key>".',
} as unknown as SecuritySchemeObject;

function buildBaseOptions() {
  const keycloakUrl = process.env.KEYCLOAK_URL || 'http://localhost:8180';
  const realm = process.env.KEYCLOAK_REALM || 'notification';

  const options = new DocumentBuilder()
    .setTitle('Notification API')
    .setDescription('Notification Service REST API.')
    .setVersion(packageJson.version)
    .setLicense('MIT', 'https://opensource.org/license/mit')
    .addServer(`http://localhost:${process.env.PORT || 3010}`, 'Local development')
    .addOAuth2(
      {
        type: 'oauth2',
        description: 'Keycloak OAuth2 Authorization Code flow',
        flows: {
          authorizationCode: {
            authorizationUrl: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`,
            tokenUrl: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
            scopes: { openid: 'OpenID Connect', profile: 'User profile', email: 'User email' },
          },
        },
      },
      'keycloak',
    )
    .addSecurityRequirements('keycloak')
    .addSecurity(API_KEY_SWAGGER_SECURITY_NAME, API_KEY_SECURITY_DEFINITIONS)
    .addTag('Events', 'Events represent a change in state of a subscriber. They are used to trigger workflows and send notifications.')
    .addTag('Subscribers', 'A subscriber represents someone who should receive a message.')
    .addTag('Topics', 'Topics are a way to group subscribers together so that they can be notified of events at once.')
    .addTag('Integrations', 'The Integration Store is responsible for storing the configurations of all the providers.')
    .addTag('Workflows', 'Each workflow acts as a container for the logic and blueprint associated with a type of notification.')
    .addTag('Messages', 'A message represents a notification delivered to a recipient on a particular channel.')
    .addTag('Environments', 'Environments allow you to manage different stages of your application development lifecycle.')
    .addTag('Layouts', 'Layouts are reusable wrappers for your email notifications.')
    .addTag('Translations', 'Used to localize your notifications to different languages.');

  return options;
}

function buildOpenApiBaseDocument() {
  return buildBaseOptions().build();
}

function createSwaggerDocumentOptions(allWebhookPayloadDtos: any[]) {
  return {
    operationIdFactory: (controllerKey: string, methodKey: string) => `${controllerKey}_${methodKey}`,
    deepScanRoutes: true,
    ignoreGlobalPrefix: false,
    include: [],
    extraModels: [...allWebhookPayloadDtos],
  };
}

function includeControllers(app: INestApplication<any>, controllerNames: Set<string>): Map<any, any> {
  const included = new Map<any, any>();
  const modulesContainer = (app as any).container?.modules;
  if (!modulesContainer) return included;

  for (const [, module] of modulesContainer) {
    for (const [, wrapper] of module.controllers) {
      if (wrapper?.metatype && controllerNames.has(wrapper.metatype.name)) {
        const existing = Reflect.getMetadata('swagger/apiExcludeController', wrapper.metatype);
        if (existing?.[0] !== false) {
          included.set(wrapper.metatype, existing);
          Reflect.defineMetadata('swagger/apiExcludeController', [false], wrapper.metatype);
        }
      }
    }
  }
  return included;
}

function restoreApiExcludeMetadata(originalMetadata: Map<any, any>) {
  for (const [metatype, md] of originalMetadata) {
    if (md) {
      Reflect.defineMetadata('swagger/apiExcludeController', md, metatype);
    } else {
      Reflect.deleteMetadata('swagger/apiExcludeController', metatype);
    }
  }
}

const DEV_INCLUDE_CONTROLLERS = new Set([
  'ActivityController',
  'AnalyticsController',
  'BlueprintController',
  'BridgeController',
  'ChangesController',
  'ChannelConnectionsController',
  'ChannelEndpointsController',
  'ContentTemplatesController',
  'EventsController',
  'ExecutionDetailsController',
  'FeedsController',
  'HealthController',
  'InboundParseController',
  'InboxController',
  'InboxTopicController',
  'IntegrationsController',
  'LayoutsController',
  'LayoutsControllerV1',
  'NotificationGroupsController',
  'NotificationTemplateController',
  'NotificationsController',
  'OutboundWebhooksController',
  'PartnerIntegrationsController',
  'PreferencesController',
  'StepResolversController',
  'StorageController',
  'SubscribersV1Controller',
  'SupportController',
  'TopicsController',
  'TopicsV1Controller',
  'WebhooksController',
  'WidgetsController',
  'WorkflowControllerV1',
  'WorkflowOverridesController',
]);

function buildFullDocumentWithPath(app: INestApplication<any>, baseDocument: Omit<OpenAPIObject, 'paths'>) {
  const allWebhookPayloadDtos = [...new Set(webhookEvents.map((event) => event.payloadDto))];
  const docOptions = createSwaggerDocumentOptions(allWebhookPayloadDtos);

  if (process.env.NODE_ENV !== 'production') {
    const included = includeControllers(app, DEV_INCLUDE_CONTROLLERS);
    try {
      return injectDocumentComponents(SwaggerModule.createDocument(app, baseDocument, docOptions));
    } catch (e: any) {
      console.warn('Swagger: failed to include dev controllers, falling back to default:', e?.message);
      restoreApiExcludeMetadata(included);
    }
  }

  return injectDocumentComponents(SwaggerModule.createDocument(app, baseDocument, docOptions));
}

function publishDeprecatedDocument(app: INestApplication<any>, document: OpenAPIObject) {
  const baseUrl = `http://localhost:${process.env.PORT || 3010}`;

  SwaggerModule.setup('api', app, {
    ...document,
    info: {
      ...document.info,
      title: `DEPRECATED: ${document.info.title}. Use /openapi.{json,yaml} instead.`,
    },
  }, {
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: `${baseUrl}/api/oauth2-redirect.html`,
      initOAuth: getSwaggerOAuthInitConfig(),
    },
  });
}

function getSwaggerOAuthInitConfig() {
  return {
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'notification-api',
    scopes: ['openid', 'profile', 'email'],
    usePkceWithAuthorizationCodeGrant: true,
  };
}

function publishOpenApiDoc(app: INestApplication<any>, document: OpenAPIObject) {
  const baseUrl = `http://localhost:${process.env.PORT || 3010}`;

  SwaggerModule.setup('openapi', app, document, {
    jsonDocumentUrl: 'openapi.json',
    yamlDocumentUrl: 'openapi.yaml',
    explorer: process.env.NODE_ENV !== 'production',
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: `${baseUrl}/openapi/oauth2-redirect.html`,
      initOAuth: getSwaggerOAuthInitConfig(),
    },
  });
}

/**
 * Generates the `x-webhooks` section for the OpenAPI document based on defined events and DTOs.
 */
function generateWebhookDefinitions(document: OpenAPIObject) {
  const webhooksDefinition: Record<string, any> = {};

  webhookEvents.forEach((webhook) => {
    const payloadSchemaRef = `#/components/schemas/${(webhook.payloadDto as Function).name}`;
    const wrapperSchemaName = `${(webhook.payloadDto as Function).name}WebhookPayloadWrapper`;

    if (document.components && !document.components.schemas?.[wrapperSchemaName]) {
      if (!document.components.schemas) {
        document.components.schemas = {};
      }
      document.components.schemas[wrapperSchemaName] = {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier of the webhook event.',
          },
          type: { type: 'string', enum: [webhook.event], description: 'The type of the webhook event.' },
          data: {
            description: 'The actual event data payload.',
            allOf: [{ $ref: payloadSchemaRef }],
          },
          timestamp: { type: 'string', format: 'date-time', description: 'ISO timestamp of when the event occurred.' },
          environmentId: { type: 'string', description: 'The ID of the environment associated with the event.' },
          object: {
            type: 'string',
            enum: [webhook.objectType],
            description: 'The type of object the event relates to.',
          },
        },
        required: ['type', 'data', 'timestamp', 'environmentId', 'object'],
      };
    }

    webhooksDefinition[webhook.event] = {
      post: {
        summary: `Event: ${webhook.event}`,
        description: `This webhook is triggered when a \`${webhook.objectType}\` event (\`${webhook.event}\`) occurs. Configure your webhook endpoint URL in the dashboard.`,
        requestBody: {
          description: `Webhook payload for the \`${webhook.event}\` event.`,
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${wrapperSchemaName}` },
            },
          },
        },
        responses: {
          '200': {
            description: 'Acknowledges successful receipt of the webhook.',
          },
        },
        tags: ['Webhooks'],
      },
    };
  });

  document['x-webhooks'] = webhooksDefinition;
}

export const setupSwagger = async (app: INestApplication) => {
  await SwaggerModule.loadPluginMetadata(metadata);
  const baseDocument = buildOpenApiBaseDocument();
  const document = buildFullDocumentWithPath(app, baseDocument);

  const declaredTagNames = new Set((document.tags || []).map((t) => t.name));
  for (const pathItem of Object.values(document.paths || {})) {
    for (const operation of Object.values(pathItem as Record<string, any>)) {
      if (operation?.tags) {
        for (const tag of operation.tags as string[]) {
          if (!declaredTagNames.has(tag)) {
            if (!document.tags) document.tags = [];
            document.tags.push({ name: tag });
            declaredTagNames.add(tag);
          }
        }
      }
    }
  }
  if (document.tags) {
    document.tags.sort((a, b) => a.name.localeCompare(b.name));
  }

  generateWebhookDefinitions(document);

  publishDeprecatedDocument(app, document);
  publishOpenApiDoc(app, document);

  return document;
};
