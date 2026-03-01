import { NotificationTemplateEntity, SubscriberEntity } from 'libs/dal';
import { ITenantDefine } from 'libs/shared';
import { IsArray, IsDefined, IsOptional, IsString, ValidateNested } from 'class-validator';

import { TriggerEventBroadcastCommand } from '../trigger-event';

export class TriggerBroadcastCommand extends TriggerEventBroadcastCommand {
  @IsDefined()
  template: NotificationTemplateEntity;

  @IsOptional()
  actor?: SubscriberEntity | undefined;

  @ValidateNested()
  tenant: ITenantDefine | null;

  @IsArray()
  @IsString({ each: true })
  contextKeys: string[];
}
