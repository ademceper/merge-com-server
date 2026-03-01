import { IntegrationEntity } from 'libs/dal';
import { ChannelTypeEnum } from 'libs/shared';
import type { IConfigurations, ICredentials, IEmailOptions } from 'libs/shared';
import type { ICheckIntegrationResponse, IEmailProvider, ISendMessageSuccessResponse } from 'libs/stateless';
import type { IHandler } from '../../shared/interfaces';

export interface IMailHandler extends IHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials & IConfigurations, from?: string);

  send(mailData: IEmailOptions): Promise<ISendMessageSuccessResponse>;

  getProvider(): IEmailProvider;

  check(): Promise<ICheckIntegrationResponse>;
}

export interface IMailFactory {
  getHandler(
    integration: Pick<IntegrationEntity, 'credentials' | 'channel' | 'providerId' | 'configurations'>
  ): IMailHandler | null;
}
