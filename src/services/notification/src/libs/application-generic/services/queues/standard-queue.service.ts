import { Injectable, Logger } from '@nestjs/common';
import { CommunityOrganizationRepository } from 'libs/dal';
import { CloudflareSchedulerMode, FeatureFlagsKeysEnum, JobTopicNameEnum } from 'libs/shared';
import { IStandardBulkJobDto, IStandardJobDto } from '../../dtos';
import { PinoLogger } from '../../logging';
import { BullMqService } from '../bull-mq';
import { CloudflareSchedulerService } from '../cloudflare-scheduler';
import { FeatureFlagsService } from '../feature-flags';
import { WorkflowInMemoryProviderService } from '../in-memory-provider';
import { SqsService } from '../sqs';
import { QueueBaseService } from './queue-base.service';

const LOG_CONTEXT = 'StandardQueueService';

@Injectable()
export class StandardQueueService extends QueueBaseService {
  constructor(
    public workflowInMemoryProviderService: WorkflowInMemoryProviderService,
    private cloudflareSchedulerService: CloudflareSchedulerService,
    private _featureFlagsService: FeatureFlagsService,
    private _organizationRepository: CommunityOrganizationRepository,
    sqsService: SqsService,
    _logger: PinoLogger
  ) {
    super(
      JobTopicNameEnum.STANDARD,
      new BullMqService(workflowInMemoryProviderService),
      sqsService,
      _featureFlagsService,
      _logger
    );

    Logger.log(`Creating queue ${this.topic}`, LOG_CONTEXT);

    this.createQueue();
    this.logger!.setContext(LOG_CONTEXT);
  }

  public async add(data: IStandardJobDto) {
    const delay = data.options?.delay || 0;
    const hasDelay = delay > 0;

    // For delayed jobs, use existing BullMQ + CF Scheduler system
    if (hasDelay) {
      return await this.handleDelayedJob(data, delay);
    }

    // For immediate jobs (delay = 0), let QueueBaseService handle SQS/BullMQ routing
    return await super.add(data);
  }

  private async handleDelayedJob(data: IStandardJobDto, delay: number) {
    const jobData = data.data!;
    const organization = await this._organizationRepository.findOne(
      { _id: jobData._organizationId },
      'apiServiceLevel',
      { readPreference: 'secondaryPreferred' }
    );
    if (!organization) {
      throw new Error(`Organization ${jobData._organizationId} not found`);
    }

    const schedulerMode = await this._featureFlagsService.getFlag<string>({
      key: FeatureFlagsKeysEnum.CF_SCHEDULER_MODE,
      defaultValue: CloudflareSchedulerMode.OFF,
      organization: { _id: jobData._organizationId, apiServiceLevel: organization.apiServiceLevel },
      environment: { _id: jobData._environmentId },
    });

    const shouldUseCFScheduler = schedulerMode !== CloudflareSchedulerMode.OFF;

    this.logger!.debug(
      {
        jobId: jobData._id,
        schedulerMode,
        shouldUseCFScheduler,
        delay,
        organizationId: jobData._organizationId,
        apiServiceLevel: organization.apiServiceLevel,
        environmentId: jobData._environmentId,
      },
      'CF Scheduler mode evaluation for delayed job'
    );

    if (!shouldUseCFScheduler) {
      return await super.add(data);
    }

    await this.handleCFSchedulerMode(data, delay, schedulerMode);
  }

  public async addBulk(data: IStandardBulkJobDto[]) {
    return await super.addBulk(data);
  }

  private async handleCFSchedulerMode(originalData: IStandardJobDto, delay: number, mode: string) {
    const jobData = originalData.data!;
    const schedulerRequest = {
      jobId: jobData._id,
      scheduledFor: Date.now() + delay,
      mode,
      data: {
        _environmentId: jobData._environmentId,
        _id: jobData._id,
        _organizationId: jobData._organizationId,
        _userId: jobData._userId,
      },
    };

    switch (mode) {
      case 'shadow':
        this.logger!.info(
          { jobId: jobData._id },
          'Shadow mode: BullMQ will process, CF Scheduler for validation'
        );

        await super.add(originalData);

        try {
          await this.cloudflareSchedulerService.scheduleJob(schedulerRequest);
        } catch (error) {
          this.logger!.warn(
            { jobId: jobData._id, error: error instanceof Error ? error.message : String(error) },
            'CF Scheduler failed in shadow mode, but BullMQ job was added successfully'
          );
        }
        break;

      case 'live':
        this.logger!.info({ jobId: jobData._id }, 'Live mode: CF Scheduler will process, BullMQ is shadow');

        await this.cloudflareSchedulerService.scheduleJob(schedulerRequest);

        await super.add({
          ...originalData,
          data: {
            ...jobData,
            skipProcessing: true,
          },
        });
        break;

      case 'complete':
        this.logger!.info({ jobId: jobData._id }, 'Complete mode: Adding only to CF Scheduler');
        await this.cloudflareSchedulerService.scheduleJob(schedulerRequest);
        break;

      default:
        this.logger!.warn({ mode }, 'Unknown CF Scheduler mode, falling back to BullMQ');
        await super.add(originalData);
    }
  }
}
