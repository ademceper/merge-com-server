import { GetstreamChatProvider } from 'libs/providers';

import { ChatProviderIdEnum, ICredentials } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';
import { BaseChatHandler } from './base.handler';

export class GetstreamChatHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.GetStream, ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    const config: {
      apiKey: string;
    } = {
      apiKey: credentials.apiKey as string,
    };
    this.provider = new GetstreamChatProvider(config);
  }
}
