import { NotificationTemplateEntity, SubscriberEntity } from 'libs/dal';
import { ChannelTypeEnum, SeverityLevelEnum, StatelessControls } from 'libs/shared';
import type { ISubscribersDefine, ITenantDefine, ProvidersIdEnum, WorkflowPreferences } from 'libs/shared';
import type { TriggerOverrides } from 'libs/shared';
import { IsArray, IsDefined, IsOptional, IsString } from 'class-validator';

import { EnvironmentWithUserCommand } from '../../commands';
import type { SubscriberTopicPreference } from '../../dtos';

export class CreateNotificationJobsCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  @IsString()
  identifier: string;

  @IsDefined()
  overrides: TriggerOverrides;

  @IsDefined()
  payload: any;

  @IsDefined()
  subscriber: SubscriberEntity;

  @IsDefined()
  template: NotificationTemplateEntity;

  @IsDefined()
  templateProviderIds: Record<ChannelTypeEnum, ProvidersIdEnum>;

  @IsDefined()
  to: ISubscribersDefine;

  @IsOptional()
  topics?: SubscriberTopicPreference[];

  @IsString()
  @IsDefined()
  transactionId: string;

  @IsOptional()
  actor?: SubscriberEntity;

  @IsOptional()
  tenant?: ITenantDefine;

  @IsArray()
  @IsString({ each: true })
  contextKeys: string[];

  bridgeUrl?: string;

  controls?: StatelessControls;

  preferences?: WorkflowPreferences;

  @IsDefined()
  severity: SeverityLevelEnum;

  @IsDefined()
  critical: boolean;
}
