import { UnifonicSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, ICredentials, SmsProviderIdEnum } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class UnifonicHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Unifonic, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new UnifonicSmsProvider({
      appSid: credentials.appSid!,
      senderId: credentials.senderId!,
    });
  }
}
