import { ExpoPushProvider } from 'libs/providers';
import { ChannelTypeEnum, PushProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BasePushHandler } from './base.handler';

export class ExpoHandler extends BasePushHandler {
  constructor() {
    super(PushProviderIdEnum.EXPO, ChannelTypeEnum.PUSH);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.apiKey) {
      throw Error('Config is not valid for expo');
    }

    this.provider = new ExpoPushProvider({
      accessToken: credentials.apiKey,
    });
  }

  isTokenInvalid(errorMessage: string): boolean {
    return this.provider.isTokenInvalid!(errorMessage);
  }
}
