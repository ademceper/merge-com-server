import { ClicksendSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class ClicksendSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Clicksend, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      username: credentials.user!,
      apiKey: credentials.apiKey!,
    };

    this.provider = new ClicksendSmsProvider(config);
  }
}
