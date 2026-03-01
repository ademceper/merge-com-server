import { ApiProperty } from '@nestjs/swagger';
import { IWorkflowOverridesResponseDto } from 'libs/shared';
import { OverrideResponseDto } from './shared';

export class GetWorkflowOverridesResponseDto implements IWorkflowOverridesResponseDto {
  @ApiProperty()
  hasMore: boolean;

  @ApiProperty()
  data: OverrideResponseDto[];

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  page: number;
}
