import { IsValidContextPayload } from 'libs/application-generic';
import { IntegrationEntity } from 'libs/dal';
import type { ContextPayload } from 'libs/shared';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { EnvironmentCommand } from '../../../../shared/commands/project.command';

export class GenerateSlackOauthUrlCommand extends EnvironmentCommand {
  @IsOptional()
  @IsString()
  readonly connectionIdentifier?: string;

  @IsOptional()
  @IsString()
  readonly subscriberId?: string;

  readonly integration: IntegrationEntity;

  @IsOptional()
  @IsValidContextPayload({ maxCount: 5 })
  context?: ContextPayload;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly scope?: string[];
}
