import { BaseCommand } from 'libs/application-generic';
import { IsNotEmpty } from 'class-validator';

export class GetEnvironmentTagsCommand extends BaseCommand {
  @IsNotEmpty()
  readonly environmentIdOrIdentifier: string;

  @IsNotEmpty()
  readonly organizationId: string;

  @IsNotEmpty()
  readonly userId: string;
}
