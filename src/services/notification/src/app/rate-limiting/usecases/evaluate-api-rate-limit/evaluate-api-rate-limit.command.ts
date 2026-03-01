import { BaseCommand } from 'libs/application-generic';
import { ApiRateLimitCategoryEnum, ApiRateLimitCostEnum } from 'libs/shared';
import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EvaluateApiRateLimitCommand extends BaseCommand {
  @IsOptional()
  @IsString()
  readonly environmentId?: string;

  @IsOptional()
  @IsString()
  readonly organizationId?: string;

  @IsDefined()
  @IsEnum(ApiRateLimitCategoryEnum)
  apiRateLimitCategory: ApiRateLimitCategoryEnum;

  @IsDefined()
  @IsEnum(ApiRateLimitCostEnum)
  apiRateLimitCost: ApiRateLimitCostEnum;

  @IsOptional()
  @IsString()
  ip?: string;
}
