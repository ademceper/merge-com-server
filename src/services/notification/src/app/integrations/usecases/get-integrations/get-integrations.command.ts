import { EnvironmentWithUserCommand } from 'libs/application-generic';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetIntegrationsCommand extends EnvironmentWithUserCommand {
  @IsBoolean()
  @IsOptional()
  returnCredentials?: boolean;
}
