import { ChannelTypeEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import type { IPushOptions, ISendMessageSuccessResponse } from 'libs/stateless';
import type { IHandler } from '../../shared/interfaces';

export interface IPushHandler extends IHandler {
  isTokenInvalid?(error: string): boolean;

  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials);

  send(smsOptions: IPushOptions): Promise<ISendMessageSuccessResponse>;
}
