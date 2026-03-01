import { MattermostProvider } from 'libs/providers';
import { ChatProviderIdEnum, ICredentials } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';
import { BaseChatHandler } from './base.handler';

export class MattermostHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.Mattermost, ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new MattermostProvider();
  }
}
