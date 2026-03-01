import { BaseCommand } from 'libs/application-generic';
import { PasswordResetFlowEnum } from 'libs/shared';
import { IsDefined, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class PasswordResetRequestCommand extends BaseCommand {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsEnum(PasswordResetFlowEnum)
  @IsOptional()
  src?: PasswordResetFlowEnum;
}
