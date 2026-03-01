import { ContentIssueEnum, IntegrationIssueEnum } from 'libs/shared';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class StepIssue {
  @IsEnum([...Object.values(ContentIssueEnum), ...Object.values(IntegrationIssueEnum)])
  issueType: ContentIssueEnum | IntegrationIssueEnum;

  @IsOptional()
  @IsString()
  variableName?: string;

  @IsString()
  message: string;
}
