import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { USE_CASES } from './usecases';
import { WorkflowOverridesController } from './workflow-overrides.controller';

@Module({
  imports: [SharedModule],
  controllers: [WorkflowOverridesController],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class WorkflowOverridesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {}
}
