import { RyverChatProvider } from 'libs/providers';
import { ChatProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';
import { BaseChatHandler } from './base.handler';

export class RyverHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.Ryver, ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new RyverChatProvider();
  }
}
