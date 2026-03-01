import { NotificationTemplateEntity, SubscriberEntity } from 'libs/dal';
import type { ITenantDefine } from 'libs/shared';
import { IsArray, IsDefined, IsOptional, IsString, ValidateNested } from 'class-validator';

import { TriggerEventMulticastCommand } from '../trigger-event';

export class TriggerMulticastCommand extends TriggerEventMulticastCommand {
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
