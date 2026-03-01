import { ContentIssueEnum } from 'libs/shared';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ContentIssue {
  @IsOptional()
  @IsString()
  variableName?: string;

  @IsString()
  message: string;

  @IsEnum(ContentIssueEnum)
  issueType: ContentIssueEnum;
}
