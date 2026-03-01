import { MandrillProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum, ICredentials } from 'libs/shared';
import { BaseEmailHandler } from './base.handler';

export class MandrillHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.Mandrill, ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: { apiKey: string; from: string; senderName: string } = {
      from: from as string,
      apiKey: credentials.apiKey as string,
      senderName: credentials.senderName as string,
    };

    this.provider = new MandrillProvider(config);
  }
}
