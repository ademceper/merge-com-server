import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';

export class WorkflowTestDataCommand extends EnvironmentWithUserObjectCommand {
  workflowIdOrInternalId: string;
}
