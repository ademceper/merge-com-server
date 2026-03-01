import { EnvironmentWithUserCommand, IsValidContextData } from 'libs/application-generic';
import { ContextData, ContextId, ContextType } from 'libs/shared';
import { IsDefined, IsString } from 'class-validator';

export class UpdateContextCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  @IsString()
  type: ContextType;

  @IsDefined()
  @IsString()
  id: ContextId;

  @IsDefined()
  @IsValidContextData()
  data: ContextData;
}
