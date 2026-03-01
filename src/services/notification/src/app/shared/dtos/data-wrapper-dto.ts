import { ApiProperty } from '@nestjs/swagger';

export class DataWrapperDto<T> {
  // No @ApiProperty() here - generic T can't be resolved at runtime.
  // Schema is built by the ApiResponse decorator in response.decorator.ts.
  data: T;
}

export class DataBooleanDto {
  @ApiProperty()
  data: boolean;
}

export class DataNumberDto {
  @ApiProperty()
  data: number;
}
