import { Sms77SmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class Sms77Handler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Sms77, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new Sms77SmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
    });
  }
}
