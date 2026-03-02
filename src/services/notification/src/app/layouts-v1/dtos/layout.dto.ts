import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResourceOriginEnum, ResourceTypeEnum } from 'libs/shared';
import { Type } from 'class-transformer';
import { ControlsMetadataDto } from '../../workflows-v2/dtos/controls-metadata.dto';
import { ChannelTypeEnum } from '../types';
import type { ITemplateVariable } from '../types';

export class LayoutDto {
  @ApiPropertyOptional()
  _id?: string;

  @ApiProperty()
  _organizationId: string;

  @ApiProperty()
  _environmentId: string;

  @ApiProperty()
  _creatorId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  identifier: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({
    enum: ChannelTypeEnum,
  })
  channel: ChannelTypeEnum;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  contentType?: string;

  @ApiPropertyOptional({ type: 'array', items: { type: 'object' } })
  variables?: ITemplateVariable[];

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional()
  updatedBy?: any;

  @ApiPropertyOptional()
  _parentId?: string;

  @ApiPropertyOptional({ enum: ResourceTypeEnum })
  type?: ResourceTypeEnum;

  @ApiPropertyOptional({ enum: ResourceOriginEnum })
  origin?: ResourceOriginEnum;

  @ApiProperty({
    description: 'Controls metadata for the layout',
    type: () => ControlsMetadataDto,
    required: true,
  })
  @Type(() => ControlsMetadataDto)
  controls: ControlsMetadataDto;

  @ApiPropertyOptional()
  isTranslationEnabled?: boolean;
}
