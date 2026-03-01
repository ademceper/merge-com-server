import { ChatProviderIdEnum } from 'libs/shared';
import { IChatOptions, IChatProvider, ISendMessageSuccessResponse } from 'libs/stateless';
import { BaseHandler } from '../../shared/interfaces';
import { IChatHandler } from '../interfaces';

export abstract class BaseChatHandler extends BaseHandler<IChatProvider> implements IChatHandler {
  protected provider!: IChatProvider;

  protected constructor(providerId: ChatProviderIdEnum, channelType: string) {
    super(providerId, channelType);
  }

  abstract buildProvider(credentials);

  async send(chatContent: IChatOptions): Promise<ISendMessageSuccessResponse> {
    if (process.env.NODE_ENV === 'test') {
      return {} as ISendMessageSuccessResponse;
    }

    const { bridgeProviderData, ...content } = chatContent;

    return await this.provider.sendMessage(content, bridgeProviderData ?? {});
  }
}
