import { Module } from '@nestjs/common';

import { StorageHelperService } from 'libs/application-generic';
import { CommunityOrganizationRepository } from 'libs/dal';
import { SharedModule } from '../shared/shared.module';
import { SubscribersV1Module } from '../subscribers/subscribersV1.module';
import { TopicsV1Controller } from './topics-v1.controller';
import { USE_CASES } from './use-cases';

@Module({
  imports: [SharedModule, SubscribersV1Module],
  providers: [...USE_CASES, StorageHelperService, CommunityOrganizationRepository],
  exports: [...USE_CASES],
  controllers: [TopicsV1Controller],
})
export class TopicsV1Module {}
