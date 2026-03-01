import { NodemailerProvider } from 'libs/providers';
import { ChannelTypeEnum, EmailProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseEmailHandler } from './base.handler';

export class NodemailerHandler extends BaseEmailHandler {
  constructor() {
    super(EmailProviderIdEnum.CustomSMTP, ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    this.provider = new NodemailerProvider({
      from: from!,
      host: credentials.host!,
      port: Number(credentials.port),
      secure: credentials.secure,
      user: credentials.user,
      password: credentials.password,
      requireTls: credentials.requireTls,
      ignoreTls: credentials.ignoreTls,
      tlsOptions: credentials.tlsOptions,
      dkim: {
        domainName: credentials.domain!,
        keySelector: credentials.accountSid!,
        privateKey: credentials.secretKey!,
      },
      senderName: credentials.senderName,
    });
  }
}
