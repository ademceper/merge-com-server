import { BulkSmsProvider } from 'libs/providers';
import { ChannelTypeEnum, ICredentials, SmsProviderIdEnum } from 'libs/shared';
import { BaseSmsHandler } from './base.handler';

export class BulkSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.BulkSms, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    const config = {
      apiToken: credentials.apiToken!,
      from: credentials.from!,
    };
    this.provider = new BulkSmsProvider(config);
  }
}
