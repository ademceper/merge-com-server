import { ChannelTypeEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { IsDefined, IsString } from 'class-validator';
import { EnvironmentCommand } from '../../../shared/commands/project.command';

export class CheckIntegrationCommand extends EnvironmentCommand {
  @IsDefined()
  @IsString()
  providerId: string;

  @IsDefined()
  channel: ChannelTypeEnum;

  @IsDefined()
  credentials?: ICredentials;
}
