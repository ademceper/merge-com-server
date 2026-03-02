import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { ExecutionDetailsController } from './execution-details.controller';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
  controllers: [ExecutionDetailsController],
})
export class ExecutionDetailsModule {}
