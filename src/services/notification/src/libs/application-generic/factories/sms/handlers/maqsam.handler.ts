import { MaqsamSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, ICredentials, SmsProviderIdEnum } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class MaqsamHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Maqsam, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new MaqsamSmsProvider({
      accessKeyId: credentials.apiKey,
      accessSecret: credentials.secretKey,
      from: credentials.from,
    });
  }
}
