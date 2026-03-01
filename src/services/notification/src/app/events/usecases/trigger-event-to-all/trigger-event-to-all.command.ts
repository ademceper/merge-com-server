import { IsValidContextPayload } from 'libs/application-generic';
import { ContextPayload, TriggerOverrides, TriggerRecipientSubscriber, TriggerTenantContext } from 'libs/shared';
import { IsDefined, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

import { EnvironmentWithUserCommand } from '../../../shared/commands/project.command';

export class TriggerEventToAllCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  @IsString()
  identifier: string;

  @IsDefined()
  payload: any;

  @IsString()
  @IsDefined()
  transactionId: string;

  @IsObject()
  @IsOptional()
  overrides?: TriggerOverrides;

  @IsOptional()
  actor?: TriggerRecipientSubscriber | null;

  @IsOptional()
  tenant?: TriggerTenantContext | null;

  @IsOptional()
  @IsString()
  bridgeUrl?: string;

  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsOptional()
  @IsValidContextPayload({ maxCount: 5 })
  context?: ContextPayload;
}
