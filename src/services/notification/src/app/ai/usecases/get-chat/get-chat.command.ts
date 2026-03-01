import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';
import { AiResourceTypeEnum } from 'libs/shared';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetChatCommand extends EnvironmentWithUserObjectCommand {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsEnum(AiResourceTypeEnum)
  resourceType?: AiResourceTypeEnum;
}
