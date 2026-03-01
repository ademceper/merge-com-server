import { NotificationTemplateEntity } from 'libs/dal';
import type { WorkflowPreferences } from 'libs/shared';

export class WorkflowWithPreferencesResponseDto extends NotificationTemplateEntity {
  userPreferences: WorkflowPreferences | null;

  defaultPreferences: WorkflowPreferences;
}
