import { SendgridEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum } from 'libs/shared';
import type { IConfigurations, ICredentials } from 'libs/shared';

import { BaseEmailHandler } from './base.handler';

export class SendgridHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.SendGrid, ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials & IConfigurations, from?: string) {
    this.provider = new SendgridEmailProvider({
      apiKey: credentials.apiKey!,
      from: from!,
      senderName: credentials.senderName!,
      ipPoolName: credentials.ipPoolName,
      webhookPublicKey: credentials.inboundWebhookSigningKey,
      region: credentials.region,
    });
  }
}
