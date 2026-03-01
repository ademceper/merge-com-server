import { KannelSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class KannelSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Kannel, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config: {
      host: string;
      port: string;
      from: string;
      username?: string;
      password?: string;
    } = {
      host: credentials.host || '',
      port: credentials.port || '',
      from: credentials.from || '',
      username: credentials.user,
      password: credentials.password,
    };

    this.provider = new KannelSmsProvider(config);
  }
}
