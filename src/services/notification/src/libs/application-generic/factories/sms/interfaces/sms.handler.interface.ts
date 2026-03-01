import { ChannelTypeEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import type { ISendMessageSuccessResponse, ISmsOptions, ISmsProvider } from 'libs/stateless';
import type { IHandler } from '../../shared/interfaces';

export interface ISmsHandler extends IHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials);

  send(smsOptions: ISmsOptions): Promise<ISendMessageSuccessResponse>;

  getProvider(): ISmsProvider;
}
