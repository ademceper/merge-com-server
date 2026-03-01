import { BrevoEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum, ICredentials } from 'libs/shared';
import { BaseEmailHandler } from './base.handler';

export class SendinblueHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.Sendinblue, ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: { apiKey: string; from: string; senderName: string } = {
      apiKey: credentials.apiKey as string,
      from: from as string,
      senderName: credentials.senderName as string,
    };

    this.provider = new BrevoEmailProvider(config);
  }
}
