import { SmsProviderIdEnum } from 'libs/shared';
import { ChannelTypeEnum } from 'libs/stateless';
import type { ISendMessageSuccessResponse, ISmsOptions, ISmsProvider } from 'libs/stateless';

import axios from 'axios';
import { BaseProvider, CasingEnum } from '../../../base.provider';
import type { WithPassthrough } from '../../../utils/types';

export class ClickatellSmsProvider extends BaseProvider implements ISmsProvider {
  id = SmsProviderIdEnum.Clickatell;
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;
  protected casing = CasingEnum.CAMEL_CASE;

  constructor(
    private config: {
      apiKey?: string;
      isTwoWayIntegration?: boolean;
    }
  ) {
    super();
  }

  async sendMessage(
    options: ISmsOptions,
    bridgeProviderData: WithPassthrough<Record<string, unknown>> = {}
  ): Promise<ISendMessageSuccessResponse> {
    const url = 'https://platform.clickatell.com/messages';

    const data = this.transform(bridgeProviderData, {
      to: [options.to],
      ...(this.config.isTwoWayIntegration && { from: options.from }),
      content: options.content,
      binary: true,
    });

    const response = await axios.create().post(url, data.body, {
      headers: {
        Authorization: this.config.apiKey,
        ...data.headers,
      },
    });

    return {
      id: response.data?.messages[0]?.apiMessageId,
      date: new Date().toISOString(),
    };
  }
}
