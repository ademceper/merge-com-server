import { WorkflowIssueTypeEnum } from 'libs/shared';

export class RuntimeIssueDto {
  issueType: WorkflowIssueTypeEnum;
  variableName?: string;
  message: string;
}
