import { Module } from '@nestjs/common';
import {
  CalculateLimitNovuIntegration,
  ChannelFactory,
  CompileTemplate,
  GetNovuProviderCredentials,
} from 'libs/application-generic';
import { CommunityOrganizationRepository, CommunityUserRepository } from 'libs/dal';
import { ChannelConnectionsModule } from '../channel-connections/channel-connections.module';
import { ChannelEndpointsModule } from '../channel-endpoints/channel-endpoints.module';
import { SharedModule } from '../shared/shared.module';
import { IntegrationsController } from './integrations.controller';
import { USE_CASES } from './usecases';

const PROVIDERS = [ChannelFactory, CompileTemplate, GetNovuProviderCredentials, CalculateLimitNovuIntegration];

@Module({
  imports: [SharedModule, ChannelConnectionsModule, ChannelEndpointsModule],
  controllers: [IntegrationsController],
  providers: [...USE_CASES, CommunityOrganizationRepository, CommunityUserRepository, ...PROVIDERS],
  exports: [...USE_CASES],
})
export class IntegrationModule {}
