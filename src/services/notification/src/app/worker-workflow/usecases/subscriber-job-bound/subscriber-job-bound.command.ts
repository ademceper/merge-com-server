import { EnvironmentWithUserCommand } from 'libs/application-generic';
import type { SubscriberTopicPreference } from 'libs/application-generic';
import { SubscriberEntity } from 'libs/dal';
import type { DiscoverWorkflowOutput } from 'libs/framework/internal';
import { StatelessControls, SubscriberSourceEnum, TriggerRequestCategoryEnum } from 'libs/shared';
import type { ISubscribersDefine, ITenantDefine } from 'libs/shared';
import type { TriggerOverrides } from 'libs/shared';
import { IsArray, IsDefined, IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';

export class SubscriberJobBoundCommand extends EnvironmentWithUserCommand {
  @IsString()
  @IsDefined()
  transactionId: string;

  // TODO: remove optional flag after all the workers are migrated to use requestId NV-6475
  @IsString()
  @IsOptional()
  requestId?: string;

  @IsDefined()
  payload: any;

  @IsDefined()
  @IsString()
  identifier: string;

  @IsDefined()
  overrides: TriggerOverrides;

  @IsOptional()
  @ValidateNested()
  tenant?: ITenantDefine;

  @IsOptional()
  actor?: SubscriberEntity;

  @IsArray()
  @IsString({ each: true })
  contextKeys: string[];

  @IsDefined()
  @IsMongoId()
  templateId: string;

  @IsDefined()
  subscriber: ISubscribersDefine;

  @IsOptional()
  topics?: SubscriberTopicPreference[];

  @IsDefined()
  @IsEnum(SubscriberSourceEnum)
  _subscriberSource: SubscriberSourceEnum;

  @IsOptional()
  @IsEnum(TriggerRequestCategoryEnum)
  requestCategory?: TriggerRequestCategoryEnum;

  bridge?: { url: string; workflow: DiscoverWorkflowOutput };

  controls?: StatelessControls;
}
