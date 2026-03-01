import { ResendEmailProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum } from 'libs/shared';
import type { IConfigurations, ICredentials } from 'libs/shared';
import { BaseEmailHandler } from './base.handler';

export class ResendHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.Resend, ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials & IConfigurations, from?: string) {
    this.provider = new ResendEmailProvider({
      from: from as string,
      apiKey: credentials.apiKey as string,
      senderName: credentials.senderName,
      webhookSigningKey: credentials.inboundWebhookSigningKey,
    });
  }
}
