import { BadRequestException, Injectable } from '@nestjs/common';
import { GetActionEnum, PostActionEnum } from 'libs/framework/internal';
import { FeatureFlagsKeysEnum } from 'libs/shared';
import { InstrumentUsecase } from '../../instrumentation';
import { FeatureFlagsService } from '../../services/feature-flags/feature-flags.service';
import { ExecuteStepResolverRequest } from '../execute-step-resolver/execute-step-resolver-request.usecase';
import { ExecuteBridgeRequestCommand } from './execute-bridge-request.command';
import type { ExecuteBridgeRequestDto } from './execute-bridge-request.command';
import { ExecuteFrameworkRequest } from './execute-framework-request.usecase';

@Injectable()
export class ExecuteBridgeRequest {
  constructor(
    private frameworkRequest: ExecuteFrameworkRequest,
    private stepResolverRequest: ExecuteStepResolverRequest,
    private featureFlagsService: FeatureFlagsService
  ) {}

  @InstrumentUsecase()
  async execute<T extends PostActionEnum | GetActionEnum>(
    command: ExecuteBridgeRequestCommand
  ): Promise<ExecuteBridgeRequestDto<T>> {
    if (command.stepResolverHash) {
      const isStepResolverEnabled = await this.featureFlagsService.getFlag({
        key: FeatureFlagsKeysEnum.IS_STEP_RESOLVER_ENABLED,
        defaultValue: false,
        organization: { _id: command.organizationId! },
      });

      if (isStepResolverEnabled) {
        if (![PostActionEnum.EXECUTE, PostActionEnum.PREVIEW].includes(command.action as PostActionEnum)) {
          throw new BadRequestException(
            `Step Resolver only supports EXECUTE and PREVIEW actions, got: ${command.action}`
          );
        }

        const result = await this.stepResolverRequest.execute(command);

        return result as ExecuteBridgeRequestDto<T>;
      }
    }

    return this.frameworkRequest.execute(command);
  }
}
