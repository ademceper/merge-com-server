import { IMediaSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class IMediaHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.IMedia, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new IMediaSmsProvider({
      token: credentials.token!,
      from: credentials.from,
    });
  }
}
