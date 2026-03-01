import { ChatWebhookProvider } from 'libs/providers';
import { ChatProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';

import { BaseChatHandler } from './base.handler';

export class ChatWebhookHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.ChatWebhook, ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      hmacSecretKey: credentials.secretKey,
    };

    this.provider = new ChatWebhookProvider(config);
  }
}
