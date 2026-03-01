import { TermiiSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class TermiiSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Termii, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new TermiiSmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
    });
  }
}
