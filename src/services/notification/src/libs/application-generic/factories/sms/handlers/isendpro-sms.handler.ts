import { ISendProSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, ICredentials, SmsProviderIdEnum } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class ISendProSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.ISendProSms, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      apiKey: credentials.apiKey ?? '',
      from: credentials.from ?? 'NOVU', // optional
    };

    this.provider = new ISendProSmsProvider(config);
  }
}
