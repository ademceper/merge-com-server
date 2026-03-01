import { SubscriberEntity } from 'libs/dal';
import { SeverityLevelEnum } from 'libs/shared';
import { IsArray, IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
import { EnvironmentWithSubscriber } from '../../../shared/commands/project.command';
import { IsEnumOrArray } from '../../../shared/validators/is-enum-or-array';
import type { NotificationFilter } from '../../utils/types';

class NotificationsFilter implements NotificationFilter {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsBoolean()
  snoozed?: boolean;

  @IsOptional()
  @IsBoolean()
  seen?: boolean;

  @IsOptional()
  @IsEnumOrArray(SeverityLevelEnum)
  severity?: SeverityLevelEnum | SeverityLevelEnum[];
}

export class NotificationsCountCommand extends EnvironmentWithSubscriber {
  @IsDefined()
  @IsArray()
  filters: NotificationsFilter[];

  @IsOptional()
  subscriber?: SubscriberEntity;
}
