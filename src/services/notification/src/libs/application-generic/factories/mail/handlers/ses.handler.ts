import { SESEmailProvider } from 'libs/providers';
import type { SESConfig } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum } from 'libs/shared';
import type { IConfigurations, ICredentials } from 'libs/shared';
import { BaseEmailHandler } from './base.handler';

export class SESHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.SES, ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials & IConfigurations, from?: string) {
    const config: SESConfig = {
      region: credentials.region as string,
      accessKeyId: credentials.apiKey as string,
      secretAccessKey: credentials.secretKey as string,
      senderName: credentials.senderName ?? 'no-reply',
      from: from as string,
      configurationSetName: credentials.configurationSetName,
    };

    this.provider = new SESEmailProvider(config);
  }
}
