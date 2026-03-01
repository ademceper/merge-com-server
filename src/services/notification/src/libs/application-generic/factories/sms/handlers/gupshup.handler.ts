import { GupshupSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, ICredentials, SmsProviderIdEnum } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class GupshupSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Gupshup, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new GupshupSmsProvider({
      userId: credentials.user,
      password: credentials.password,
    });
  }
}
