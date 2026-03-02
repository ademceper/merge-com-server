import { Module } from '@nestjs/common';
import { ChangeModule } from '../change/change.module';
import { SharedModule } from '../shared/shared.module';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule, ChangeModule],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class MessageTemplateModule {}
