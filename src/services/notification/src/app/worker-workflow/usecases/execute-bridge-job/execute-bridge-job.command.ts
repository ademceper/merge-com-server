import { EnvironmentWithUserCommand } from 'libs/application-generic';
import type { IFilterVariables } from 'libs/application-generic';

import { JobEntity, NotificationTemplateEntity } from 'libs/dal';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class ExecuteBridgeJobCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  @IsString()
  environmentId: string;

  @IsDefined()
  @IsString()
  organizationId: string;

  @IsDefined()
  @IsString()
  userId: string;

  @IsDefined()
  @IsString()
  identifier: string;

  @IsDefined()
  jobId: string;

  @IsDefined()
  job: JobEntity;

  @IsDefined()
  variables?: IFilterVariables;

  @IsOptional()
  workflow?: NotificationTemplateEntity;
}
