import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';
import { AiResourceTypeEnum } from 'libs/shared';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class GetLatestChatCommand extends EnvironmentWithUserObjectCommand {
  @IsNotEmpty()
  @IsEnum(AiResourceTypeEnum)
  resourceType: AiResourceTypeEnum;

  @IsString()
  @IsNotEmpty()
  resourceId: string;
}
