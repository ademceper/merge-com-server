import { ISendSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class ISendSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.ISendSms, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config: {
      apiToken: string;
    } = {
      apiToken: credentials.apiToken ?? '',
      ...credentials,
    };

    this.provider = new ISendSmsProvider(config);
  }
}
