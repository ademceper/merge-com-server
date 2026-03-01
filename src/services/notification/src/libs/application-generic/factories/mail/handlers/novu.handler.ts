import { SendgridEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum, ICredentials } from 'libs/shared';

import { BaseEmailHandler } from './base.handler';

export class NovuEmailHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.Novu, ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials, from?: string) {
    this.provider = new SendgridEmailProvider({
      apiKey: credentials.apiKey!,
      from: from!,
      senderName: credentials.senderName!,
      ipPoolName: credentials.ipPoolName,
    });
  }
}
