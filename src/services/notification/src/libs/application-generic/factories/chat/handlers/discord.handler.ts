import { DiscordProvider } from 'libs/providers';
import { ChatProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';
import { BaseChatHandler } from './base.handler';

export class DiscordHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.Discord, ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new DiscordProvider({});
  }
}
