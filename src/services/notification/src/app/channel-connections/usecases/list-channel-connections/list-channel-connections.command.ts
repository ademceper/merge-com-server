import { CursorBasedPaginatedCommand } from 'libs/application-generic';
import { ChannelConnectionEntity } from 'libs/dal';
import { ChannelTypeEnum, ProvidersIdEnumConst } from 'libs/shared';
import type { ProvidersIdEnum } from 'libs/shared';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class ListChannelConnectionsCommand extends CursorBasedPaginatedCommand<
  ChannelConnectionEntity,
  'createdAt' | 'updatedAt'
> {
  @IsOptional()
  @IsString()
  subscriberId?: string;

  @IsEnum(ChannelTypeEnum)
  @IsOptional()
  channel?: ChannelTypeEnum;

  @IsEnum(ProvidersIdEnumConst)
  @IsOptional()
  providerId?: ProvidersIdEnum;

  @IsOptional()
  @IsString()
  integrationIdentifier?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contextKeys?: string[];
}
