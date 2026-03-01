import { OrganizationCommand } from 'libs/application-generic';
import { IsNotEmpty } from 'class-validator';

export class SwitchEnvironmentCommand extends OrganizationCommand {
  @IsNotEmpty()
  newEnvironmentId: string;
}
