import { EnvironmentWithSubscriber } from 'libs/application-generic';
import { NotificationTemplateEntity, SubscriberEntity } from 'libs/dal';
import { SeverityLevelEnum, WorkflowCriticalityEnum } from 'libs/shared';
import { IsArray, IsBoolean, IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetSubscriberPreferenceCommand extends EnvironmentWithSubscriber {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(SeverityLevelEnum, { each: true })
  severity?: SeverityLevelEnum[];

  @IsBoolean()
  @IsDefined()
  includeInactiveChannels: boolean;

  @IsEnum(WorkflowCriticalityEnum)
  @IsOptional()
  criticality: WorkflowCriticalityEnum;

  @IsOptional()
  subscriber?: Pick<SubscriberEntity, '_id'>;

  @IsOptional()
  workflowList?: NotificationTemplateEntity[];
}
