import { EnvironmentLevelCommand } from 'libs/application-generic';
import { JobStatusEnum } from 'libs/dal';
import { IsDefined, IsOptional } from 'class-validator';

export class UpdateJobStatusCommand extends EnvironmentLevelCommand {
  @IsDefined()
  jobId: string;

  @IsDefined()
  status: JobStatusEnum;

  @IsOptional()
  error?: any;
}
