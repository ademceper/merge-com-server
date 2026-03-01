import { SparkPostEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum, ICredentials } from 'libs/shared';

import { BaseEmailHandler } from './base.handler';

export class SparkPostHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.SparkPost, ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config = {
      from: from as string,
      apiKey: credentials.apiKey as string,
      region: credentials.region as string,
      senderName: credentials.senderName as string,
    };

    this.provider = new SparkPostEmailProvider(config);
  }
}
