import { ChannelTypeEnum, ICredentials } from 'libs/shared';
import { IPushOptions, ISendMessageSuccessResponse } from 'libs/stateless';
import { IHandler } from '../../shared/interfaces';

export interface IPushHandler extends IHandler {
  isTokenInvalid?(error: string): boolean;

  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials);

  send(smsOptions: IPushOptions): Promise<ISendMessageSuccessResponse>;
}
