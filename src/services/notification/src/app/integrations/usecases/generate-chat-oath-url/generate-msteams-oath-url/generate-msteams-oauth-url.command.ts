import { IsValidContextPayload } from 'libs/application-generic';
import { IntegrationEntity } from 'libs/dal';
import type { ContextPayload } from 'libs/shared';
import { IsOptional, IsString } from 'class-validator';
import { EnvironmentCommand } from '../../../../shared/commands/project.command';

export class GenerateMsTeamsOauthUrlCommand extends EnvironmentCommand {
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
}
