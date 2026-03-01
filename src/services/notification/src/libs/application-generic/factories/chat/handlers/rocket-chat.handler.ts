import { RocketChatProvider } from 'libs/providers';
import { ChatProviderIdEnum, ICredentials } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';
import { BaseChatHandler } from './base.handler';

export class RocketChatHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.RocketChat, ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    const config: { token: string; user: string } = {
      token: credentials.token as string,
      user: credentials.user as string,
    };
    this.provider = new RocketChatProvider(config);
  }
}
