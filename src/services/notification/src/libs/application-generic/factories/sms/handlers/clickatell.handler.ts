import { ClickatellSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, SmsProviderIdEnum } from 'libs/shared';
import type { ICredentials } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class ClickatellHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Clickatell, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new ClickatellSmsProvider({ apiKey: credentials.apiKey });
  }
}
