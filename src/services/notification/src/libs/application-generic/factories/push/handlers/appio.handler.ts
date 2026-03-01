import { ChannelTypeEnum, ICredentials, PushProviderIdEnum } from 'libs/shared';
import { AppioPushProvider } from 'libs/providers';
import { BasePushHandler } from './base.handler';

export class AppIOHandler extends BasePushHandler {
  constructor() {
    super(PushProviderIdEnum.AppIO, ChannelTypeEnum.PUSH);
  }

  buildProvider(credentials: ICredentials) {
    const config: { AppIOBaseUrl?: string } = { AppIOBaseUrl: credentials.apiKey };

    this.provider = new AppioPushProvider(config);
  }
}
