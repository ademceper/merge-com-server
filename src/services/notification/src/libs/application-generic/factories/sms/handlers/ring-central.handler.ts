import { RingCentralSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class RingCentralHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.RingCentral, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    if (!credentials.clientId || !credentials.secretKey || !credentials.token || !credentials.from) {
      throw Error('Invalid credentials');
    }

    this.provider = new RingCentralSmsProvider({
      clientId: credentials.clientId,
      clientSecret: credentials.secretKey,
      isSandBox: credentials.secure || false,
      jwtToken: credentials.token,
      from: credentials.from,
    });
  }
}
