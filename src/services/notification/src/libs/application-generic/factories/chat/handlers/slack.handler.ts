import { SlackProvider } from 'libs/providers';
import { ChatProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';

import { BaseChatHandler } from './base.handler';

export class SlackHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.Slack, ChannelTypeEnum.CHAT);
  }

  buildProvider(_: ICredentials) {
    this.provider = new SlackProvider();
  }
}
