import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';
import { IsOptional, IsString } from 'class-validator';

export class DiffEnvironmentCommand extends EnvironmentWithUserObjectCommand {
  @IsOptional()
  @IsString()
  sourceEnvironmentId?: string;

  @IsString()
  targetEnvironmentId: string;
}
