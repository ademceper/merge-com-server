import { BaseCommand } from 'libs/application-generic';
import { IsDefined, IsString } from 'class-validator';

export class GetBlueprintCommand extends BaseCommand {
  @IsDefined()
  @IsString()
  templateIdOrIdentifier: string;
}
