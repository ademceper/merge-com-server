import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';
import { IsDefined, IsString } from 'class-validator';

export class WorkflowTestDataCommand extends EnvironmentWithUserObjectCommand {
  @IsString()
  @IsDefined()
  workflowIdOrInternalId: string;
}
