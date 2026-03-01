import { AfroSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class AfroSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.AfroSms, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new AfroSmsProvider({
      apiKey: credentials.apiKey,
      senderName: credentials.senderName,
      from: credentials.from,
    });
  }
}
