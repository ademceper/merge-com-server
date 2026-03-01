import { MailersendEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';

import { BaseEmailHandler } from './base.handler';

export class MailerSendHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.MailerSend, ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials, from?: string) {
    this.provider = new MailersendEmailProvider({
      apiKey: credentials.apiKey as string,
      from: from as string,
      senderName: credentials.senderName,
    });
  }
}
