import { NotificationTemplateEntity } from 'libs/dal';
import { WorkflowPreferences } from 'libs/shared';

export class WorkflowWithPreferencesResponseDto extends NotificationTemplateEntity {
  userPreferences: WorkflowPreferences | null;

  defaultPreferences: WorkflowPreferences;
}
