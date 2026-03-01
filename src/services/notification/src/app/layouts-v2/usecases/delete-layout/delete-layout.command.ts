import { EnvironmentWithUserCommand } from 'libs/application-generic';
import { IsDefined, IsString } from 'class-validator';

export class DeleteLayoutCommand extends EnvironmentWithUserCommand {
  @IsString()
  @IsDefined()
  layoutIdOrInternalId: string;
}
