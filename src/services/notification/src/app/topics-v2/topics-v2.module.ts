import { Module } from '@nestjs/common';
import { GetPreferences } from 'libs/application-generic';
import { ContextRepository } from 'libs/dal';
import { SharedModule } from '../shared/shared.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { TopicsController } from './topics.controller';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule, SubscriptionsModule],
  controllers: [TopicsController],
  providers: [...USE_CASES, GetPreferences, ContextRepository],
  exports: [...USE_CASES],
})
export class TopicsV2Module {}
