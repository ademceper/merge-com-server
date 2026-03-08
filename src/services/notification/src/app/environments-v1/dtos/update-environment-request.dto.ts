import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexColor, IsMongoId, IsOptional, IsString } from 'class-validator';

class InBoundParseDomainDto {
  @ApiPropertyOptional({ type: String })
  inboundParseDomain?: string;
}

class BridgeConfigurationDto {
  @ApiPropertyOptional({ type: String })
  url?: string;
}

export class UpdateEnvironmentRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  identifier?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  parentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsHexColor()
  color?: string;

  @ApiPropertyOptional({
    type: () => InBoundParseDomainDto,
  })
  dns?: InBoundParseDomainDto;

  @ApiPropertyOptional({
    type: () => BridgeConfigurationDto,
  })
  bridge?: BridgeConfigurationDto;
}
