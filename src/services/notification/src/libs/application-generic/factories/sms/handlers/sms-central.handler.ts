import { SmsCentralSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class SmsCentralHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.SmsCentral, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    if (!credentials.user || !credentials.password || !credentials.from) {
      throw Error('Invalid credentials');
    }

    const config = {
      username: credentials.user,
      password: credentials.password,
      from: credentials.from,
      baseUrl: credentials.baseUrl,
    };

    this.provider = new SmsCentralSmsProvider(config);
  }
}
