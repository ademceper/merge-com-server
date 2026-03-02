import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PreferencesTypeEnum } from 'libs/shared';
import type { Schedule, SubscriberGlobalPreference, WorkflowPreferences, WorkflowPreferencesPartial } from 'libs/shared';

export class GetPreferencesResponseDto {
  @ApiProperty({ type: 'object' })
  preferences: WorkflowPreferences;

  @ApiPropertyOptional({ type: 'object' })
  schedule?: Schedule;

  @ApiProperty({ enum: PreferencesTypeEnum })
  type: PreferencesTypeEnum;

  @ApiProperty({ type: 'object' })
  source: {
    WORKFLOW_RESOURCE: WorkflowPreferences;
    USER_WORKFLOW: WorkflowPreferences | null;
    SUBSCRIBER_GLOBAL: SubscriberGlobalPreference | null;
    SUBSCRIBER_WORKFLOW: WorkflowPreferencesPartial | null;
  };
}
