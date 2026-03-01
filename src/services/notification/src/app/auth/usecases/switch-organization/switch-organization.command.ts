import { AuthenticatedCommand } from 'libs/application-generic';
import { IsNotEmpty } from 'class-validator';

export class SwitchOrganizationCommand extends AuthenticatedCommand {
  @IsNotEmpty()
  newOrganizationId: string;
}
