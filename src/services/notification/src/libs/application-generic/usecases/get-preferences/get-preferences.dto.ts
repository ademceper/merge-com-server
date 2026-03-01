import { PreferencesTypeEnum } from 'libs/shared';
import type { Schedule, SubscriberGlobalPreference, WorkflowPreferences, WorkflowPreferencesPartial } from 'libs/shared';

export class GetPreferencesResponseDto {
  preferences: WorkflowPreferences;

  schedule?: Schedule;

  type: PreferencesTypeEnum;

  source: {
    WORKFLOW_RESOURCE: WorkflowPreferences;
    USER_WORKFLOW: WorkflowPreferences | null;
    SUBSCRIBER_GLOBAL: SubscriberGlobalPreference | null;
    SUBSCRIBER_WORKFLOW: WorkflowPreferencesPartial | null;
  };
}
