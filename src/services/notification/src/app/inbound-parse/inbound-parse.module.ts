import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule, OnApplicationShutdown } from '@nestjs/common';
import { CompileTemplate, WorkflowInMemoryProviderService } from 'libs/application-generic';
import { SharedModule } from '../shared/shared.module';
import { InboundParseController } from './inbound-parse.controller';
import { USE_CASES } from './usecases';

const PROVIDERS = [CompileTemplate];

const memoryQueueService = {
  provide: WorkflowInMemoryProviderService,
  useFactory: async () => {
    const memoryService = new WorkflowInMemoryProviderService();

    await memoryService.initialize();

    return memoryService;
  },
};
@Module({
  imports: [SharedModule],
  controllers: [InboundParseController],
  providers: [...PROVIDERS, ...USE_CASES, memoryQueueService],
  exports: [...USE_CASES],
})
export class InboundParseModule implements NestModule, OnApplicationShutdown {
  constructor(private workflowInMemoryProviderService: WorkflowInMemoryProviderService) {}
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {}

  async onApplicationShutdown() {
    await this.workflowInMemoryProviderService.shutdown();
  }
}
