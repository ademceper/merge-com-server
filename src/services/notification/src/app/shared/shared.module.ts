import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  analyticsService,
  BulkCreateExecutionDetails,
  CacheServiceHealthIndicator,
  clickHouseBatchService,
  CloudflareSchedulerService,
  ComputeJobWaitDurationService,
  CreateExecutionDetails,
  CreateNotificationJobs,
  CreateOrUpdateSubscriberUseCase,
  cacheService,
  clickHouseService,
  createNestLoggingModuleOptions,
  DalServiceHealthIndicator,
  DeliveryTrendCountsRepository,
  DigestFilterSteps,
  ExecuteBridgeRequest,
  ExecuteFrameworkRequest,
  ExecuteStepResolverRequest,
  featureFlagsService,
  GetDecryptedSecretKey,
  GetTenant,
  CreateTenant,
  InMemoryLRUCacheService,
  InvalidateCacheService,
  LoggerModule,
  MetricsModule,
  ProcessTenant,
  QueuesModule,
  RequestLogRepository,
  StepRunRepository,
  StorageHelperService,
  storageService,
  TraceLogRepository,
  TraceRollupRepository,
  UpdateSubscriber,
  UpdateSubscriberChannel,
  UpdateTenant,
  WebSocketsInMemoryProviderService,
  WorkflowInMemoryProviderService,
  WorkflowRunRepository,
  WorkflowRunService,
} from 'libs/application-generic';
import {
  ChangeRepository,
  CommunityMemberRepository,
  CommunityOrganizationRepository,
  CommunityUserRepository,
  ControlValuesRepository,
  DalService,
  EnvironmentRepository,
  ExecutionDetailsRepository,
  FeedRepository,
  IntegrationRepository,
  JobRepository,
  LayoutRepository,
  MemberRepository,
  MessageRepository,
  MessageTemplateRepository,
  NotificationGroupRepository,
  NotificationRepository,
  NotificationTemplateRepository,
  OrganizationRepository,
  PreferencesRepository,
  SubscriberRepository,
  TenantRepository,
  TopicRepository,
  TopicSubscribersRepository,
  UserRepository,
  WorkflowOverrideRepository,
} from 'libs/dal';
import { isClerkEnabled, JobTopicNameEnum } from 'libs/shared';
import packageJson from '../../../package.json';
import { SubscriberOnlineService } from '../socket/subscriber-online';
import { ActiveJobsMetricService } from '../worker-workflow/services';

function getDynamicAuthProviders() {
  if (isClerkEnabled()) {
    const eeAuthPackage = require('@novu/ee-auth');

    return eeAuthPackage.injectEEAuthProviders();
  } else {
    const userRepositoryProvider = {
      provide: 'USER_REPOSITORY',
      useClass: CommunityUserRepository,
    };

    const memberRepositoryProvider = {
      provide: 'MEMBER_REPOSITORY',
      useClass: CommunityMemberRepository,
    };

    const organizationRepositoryProvider = {
      provide: 'ORGANIZATION_REPOSITORY',
      useClass: CommunityOrganizationRepository,
    };

    return [userRepositoryProvider, memberRepositoryProvider, organizationRepositoryProvider];
  }
}

const DAL_MODELS = [
  UserRepository,
  OrganizationRepository,
  CommunityOrganizationRepository,
  EnvironmentRepository,
  ExecutionDetailsRepository,
  NotificationTemplateRepository,
  SubscriberRepository,
  NotificationRepository,
  MessageRepository,
  MessageTemplateRepository,
  NotificationGroupRepository,
  MemberRepository,
  LayoutRepository,
  IntegrationRepository,
  ChangeRepository,
  JobRepository,
  FeedRepository,
  TopicRepository,
  TopicSubscribersRepository,
  TenantRepository,
  WorkflowOverrideRepository,
  ControlValuesRepository,
  PreferencesRepository,
];

const dalService = {
  provide: DalService,
  useFactory: async () => {
    const service = new DalService();
    await service.connect(process.env.MONGO_URL || '.');

    return service;
  },
};

const ANALYTICS_PROVIDERS = [
  // Repositories
  RequestLogRepository,
  TraceLogRepository,
  StepRunRepository,
  WorkflowRunRepository,
  TraceRollupRepository,
  DeliveryTrendCountsRepository,

  // Services
  clickHouseService,
  clickHouseBatchService,
  WorkflowRunService,
];

const PROVIDERS = [
  analyticsService,
  BulkCreateExecutionDetails,
  cacheService,
  CacheServiceHealthIndicator,
  CloudflareSchedulerService,
  ComputeJobWaitDurationService,
  CreateExecutionDetails,
  CreateNotificationJobs,
  CreateOrUpdateSubscriberUseCase,
  dalService,
  DalServiceHealthIndicator,
  DigestFilterSteps,
  featureFlagsService,
  GetDecryptedSecretKey,
  GetTenant,
  CreateTenant,
  InMemoryLRUCacheService,
  InvalidateCacheService,
  ProcessTenant,
  StorageHelperService,
  storageService,
  SubscriberOnlineService,
  UpdateSubscriber,
  UpdateSubscriberChannel,
  UpdateTenant,
  WebSocketsInMemoryProviderService,
  WorkflowInMemoryProviderService,
  ActiveJobsMetricService,
  ...DAL_MODELS,
  ExecuteBridgeRequest,
  ExecuteFrameworkRequest,
  ExecuteStepResolverRequest,
  ...ANALYTICS_PROVIDERS,
];

const IMPORTS = [
  MetricsModule,
  QueuesModule.forRoot([
    JobTopicNameEnum.WEB_SOCKETS,
    JobTopicNameEnum.WORKFLOW,
    JobTopicNameEnum.INBOUND_PARSE_MAIL,
    JobTopicNameEnum.STANDARD,
    JobTopicNameEnum.PROCESS_SUBSCRIBER,
    JobTopicNameEnum.ACTIVE_JOBS_METRIC,
  ]),
  LoggerModule.forRoot(
    createNestLoggingModuleOptions({
      serviceName: packageJson.name,
      version: packageJson.version,
    })
  ),
  JwtModule.register({
    secretOrKeyProvider: () => process.env.JWT_SECRET as string,
    signOptions: {
      expiresIn: 360000,
    },
  }),
];

PROVIDERS.push(...getDynamicAuthProviders());

@Module({
  imports: [...IMPORTS],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS, LoggerModule, QueuesModule, JwtModule],
})
export class SharedModule {}
