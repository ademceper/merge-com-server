import { PostmarkEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum, ICredentials } from 'libs/shared';
import { BaseEmailHandler } from './base.handler';

export class PostmarkHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.Postmark, ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: { apiKey: string; from: string } = {
      from: from as string,
      apiKey: credentials.apiKey as string,
    };

    this.provider = new PostmarkEmailProvider(config);
  }
}
