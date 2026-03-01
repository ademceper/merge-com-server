import { PushProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import type { IPushOptions, IPushProvider, ISendMessageSuccessResponse } from 'libs/stateless';
import { BaseHandler } from '../../shared/interfaces';
import type { IPushHandler } from '../interfaces';

export abstract class BasePushHandler extends BaseHandler<IPushProvider> implements IPushHandler {
  protected provider!: IPushProvider;

  protected constructor(providerId: PushProviderIdEnum, channelType: string) {
    super(providerId, channelType);
  }

  async send(options: IPushOptions): Promise<ISendMessageSuccessResponse> {
    if (process.env.NODE_ENV === 'test') {
      return {} as ISendMessageSuccessResponse;
    }

    const { bridgeProviderData, ...otherOptions } = options;

    return await this.provider.sendMessage(otherOptions, bridgeProviderData ?? {});
  }

  abstract buildProvider(credentials: ICredentials);
}
