import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';
import { IsDefined, IsString } from 'class-validator';

export class ClearActiveStreamCommand extends EnvironmentWithUserObjectCommand {
  @IsDefined()
  @IsString()
  chatId: string;

  @IsDefined()
  @IsString()
  streamId: string;
}
