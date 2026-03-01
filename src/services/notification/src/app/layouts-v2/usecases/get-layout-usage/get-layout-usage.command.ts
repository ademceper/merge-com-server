import { EnvironmentCommand } from 'libs/application-generic';
import { IsString } from 'class-validator';

export class GetLayoutUsageCommand extends EnvironmentCommand {
  @IsString()
  layoutIdOrInternalId: string;
}
