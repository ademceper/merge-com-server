import { NotificationTemplateEntity, SubscriberEntity } from 'libs/dal';
import { ITenantDefine } from 'libs/shared';
import { IsBoolean, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { EnvironmentWithSubscriber } from '../../commands';

export class GetSubscriberTemplatePreferenceCommand extends EnvironmentWithSubscriber {
  @IsNotEmpty()
  @IsDefined()
  template: NotificationTemplateEntity;

  @IsOptional()
  subscriber?: Pick<SubscriberEntity, '_id'>;

  @IsOptional()
  tenant?: ITenantDefine;

  @IsDefined()
  @IsBoolean()
  includeInactiveChannels: boolean;
}
