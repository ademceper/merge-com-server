import { PlunkEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseEmailHandler } from './base.handler';

export class PlunkHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.Plunk, ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials) {
    const config: { apiKey: string; senderName: string } = {
      apiKey: credentials.apiKey!,
      senderName: credentials.senderName!,
    };

    this.provider = new PlunkEmailProvider(config);
  }
}
