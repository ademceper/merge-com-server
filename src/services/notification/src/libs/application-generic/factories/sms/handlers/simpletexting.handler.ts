import { SimpletextingSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class SimpletextingSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Simpletexting, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      apiKey: credentials.apiKey!,
      accountPhone: credentials.from!,
    };

    this.provider = new SimpletextingSmsProvider(config);
  }
}
