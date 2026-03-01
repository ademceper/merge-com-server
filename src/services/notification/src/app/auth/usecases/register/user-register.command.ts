import { BaseCommand } from 'libs/application-generic';

import { JobTitleEnum, SignUpOriginEnum } from 'libs/shared';
import type { ProductUseCases } from 'libs/shared';
import { IsBoolean, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UserRegisterCommand extends BaseCommand {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  @IsDefined()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  organizationName?: string;

  @IsOptional()
  @IsEnum(SignUpOriginEnum)
  origin?: SignUpOriginEnum;

  @IsOptional()
  @IsEnum(JobTitleEnum)
  jobTitle?: JobTitleEnum;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsOptional()
  productUseCases?: ProductUseCases;

  @IsOptional()
  @IsBoolean()
  wasInvited?: boolean = false;

  language?: string[];
}
