import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';
import type { ClientSession } from 'libs/dal';
import { AiResourceTypeEnum } from 'libs/shared';
import { Exclude } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpsertChatCommand extends EnvironmentWithUserObjectCommand {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsArray()
  messages?: unknown[];

  @IsOptional()
  @IsString()
  activeStreamId?: string | null;

  @IsOptional()
  @IsEnum(AiResourceTypeEnum)
  resourceType?: AiResourceTypeEnum;

  @IsOptional()
  @IsString()
  resourceId?: string;

  @IsOptional()
  @IsBoolean()
  hasPendingChanges?: boolean;

  @IsOptional()
  @IsString()
  resumeCheckpointId?: string | null;

  /**
   * Exclude session from the command to avoid serializing it in the response
   */
  @IsOptional()
  @Exclude()
  session?: ClientSession | null;
}
