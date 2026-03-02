import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SeverityLevelEnum } from 'libs/shared';

export class NotificationFilterDto {
  @ApiPropertyOptional({ type: [String] })
  tags?: string[];

  @ApiPropertyOptional({ type: Boolean })
  read?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  archived?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  snoozed?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  seen?: boolean;

  @ApiPropertyOptional({ type: String })
  data?: string;

  @ApiPropertyOptional({ enum: SeverityLevelEnum })
  severity?: SeverityLevelEnum | SeverityLevelEnum[];

  @ApiPropertyOptional({ type: Number })
  createdGte?: number;

  @ApiPropertyOptional({ type: Number })
  createdLte?: number;
}

export class NotificationCountItemDto {
  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: () => NotificationFilterDto })
  filter: NotificationFilterDto;
}

export class GetNotificationsCountResponseDto {
  @ApiProperty({ type: () => [NotificationCountItemDto] })
  data: NotificationCountItemDto[];
}
