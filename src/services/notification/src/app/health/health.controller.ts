import { Controller, Get, NotFoundException } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Public } from '../keycloak/public.decorator';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import type { HealthCheckResult, HealthIndicatorFunction } from '@nestjs/terminus';
import {
  CacheServiceHealthIndicator,
  DalServiceHealthIndicator,
  ExternalApiAccessible,
  SkipPermissionsCheck,
  WorkflowQueueServiceHealthIndicator,
} from 'libs/application-generic';
import { version } from '../../../package.json';
import { ApiCommonResponses, ApiCreatedResponse } from '../shared/framework/response.decorator';
import {
  IdempotenceTestingResponse,
  IdempotencyBehaviorEnum,
  IdempotencyTestingDto,
} from '../testing/dtos/idempotency.dto';

@Controller('health-check')
@ApiTags('Health')
@ApiExcludeController()
@Public()
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private cacheHealthIndicator: CacheServiceHealthIndicator,
    private dalHealthIndicator: DalServiceHealthIndicator,
    private workflowQueueHealthIndicator: WorkflowQueueServiceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    const checks: HealthIndicatorFunction[] = [
      async () => this.dalHealthIndicator.isHealthy(),
      async () => this.workflowQueueHealthIndicator.isHealthy(),
      async () => ({
        apiVersion: {
          version,
          status: 'up',
        },
      }),
    ];

    if (process.env.ELASTICACHE_CLUSTER_SERVICE_HOST) {
      checks.push(async () => this.cacheHealthIndicator.isHealthy());
    }

    return this.healthCheckService.check(checks);
  }

  @ExternalApiAccessible()
  @ApiCommonResponses()
  @ApiCreatedResponse({ type: IdempotenceTestingResponse })
  @Post('/test-idempotency')
  @SkipPermissionsCheck()
  async testIdempotency(@Body() body: IdempotencyTestingDto): Promise<IdempotenceTestingResponse> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    const randomNumber = Math.random();
    if (body.expectedBehavior === IdempotencyBehaviorEnum.IMMEDIATE_RESPONSE) {
      return { number: randomNumber };
    }
    if (body.expectedBehavior === IdempotencyBehaviorEnum.IMMEDIATE_EXCEPTION) {
      throw new Error(new Date().toDateString());
    }
    if (body.expectedBehavior === IdempotencyBehaviorEnum.DELAYED_RESPONSE) {
      // for testing conflict
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    }

    return { number: randomNumber };
  }
  @ExternalApiAccessible()
  @ApiCommonResponses()
  @ApiCreatedResponse({ type: IdempotenceTestingResponse })
  @Get('/test-idempotency')
  @SkipPermissionsCheck()
  async generateRandomNumber(): Promise<IdempotenceTestingResponse> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    const randomNumber = Math.random();

    return { number: randomNumber };
  }
}
