import { WhatsappBusinessChatProvider } from 'libs/providers';
import { ChannelTypeEnum, ChatProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseChatHandler } from './base.handler';

export class WhatsAppBusinessHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.WhatsAppBusiness, ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new WhatsappBusinessChatProvider({
      accessToken: credentials.apiToken!,
      phoneNumberIdentification: credentials.phoneNumberIdentification!,
    });
  }
}
