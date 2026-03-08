import type { CustomDataType } from '../../types';
import { NotificationStepDto } from '../workflows';

interface IUpdateNotificationTemplateDto {
  name?: string;

  tags?: string[];

  description?: string;

  identifier?: string;

  critical?: boolean;

  steps?: NotificationStepDto[];

  notificationGroupId?: string;

  data?: CustomDataType;
}
