import { ButtonTypeEnum, MessageActionStatusEnum } from 'libs/shared';
import { IsDefined, IsMongoId, IsOptional } from 'class-validator';
import { EnvironmentWithSubscriber } from '../../../shared/commands/project.command';

export class UpdateMessageActionsCommand extends EnvironmentWithSubscriber {
  @IsMongoId()
  messageId: string;

  @IsDefined()
  type: ButtonTypeEnum;

  @IsDefined()
  status: MessageActionStatusEnum;

  @IsOptional()
  payload?: any;
}
