import { Injectable } from '@nestjs/common';
import { ExecuteBridgeRequest, ExecuteBridgeRequestCommand, ExecuteBridgeRequestDto } from 'libs/application-generic';
import { GetActionEnum, HealthCheck } from 'libs/framework/internal';
import { ResourceOriginEnum } from 'libs/shared';
import { GetBridgeStatusCommand } from './get-bridge-status.command';

export const LOG_CONTEXT = 'GetBridgeStatusUsecase';

@Injectable()
export class GetBridgeStatus {
  constructor(private executeBridgeRequest: ExecuteBridgeRequest) {}

  async execute(command: GetBridgeStatusCommand): Promise<HealthCheck> {
    return (await this.executeBridgeRequest.execute(
      ExecuteBridgeRequestCommand.create({
        environmentId: command.environmentId,
        action: GetActionEnum.HEALTH_CHECK,
        workflowOrigin: ResourceOriginEnum.EXTERNAL,
        statelessBridgeUrl: command.statelessBridgeUrl,
        retriesLimit: 1,
      })
    )) as ExecuteBridgeRequestDto<GetActionEnum.HEALTH_CHECK>;
  }
}
