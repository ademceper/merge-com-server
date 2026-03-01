import { Module } from '@nestjs/common';
import { GetPreferences } from 'libs/application-generic';
import { ContextRepository } from 'libs/dal';
import { SharedModule } from '../shared/shared.module';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule],
  providers: [...USE_CASES, GetPreferences, ContextRepository],
  exports: [...USE_CASES],
})
export class SubscriptionsModule {}
