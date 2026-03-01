import { ApiProperty } from '@nestjs/swagger';
import type { IWorkflowOverridesResponseDto } from 'libs/shared';
import { OverrideResponseDto } from './shared';

export class GetWorkflowOverridesResponseDto implements IWorkflowOverridesResponseDto {
  @ApiProperty()
  hasMore: boolean;

  @ApiProperty({ type: () => [OverrideResponseDto] })
  data: OverrideResponseDto[];

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  page: number;
}
