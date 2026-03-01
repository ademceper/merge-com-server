import { AuthType, Infobip } from '@infobip-api/sdk';
import { EmailProviderIdEnum } from 'libs/shared';
import { ChannelTypeEnum, CheckIntegrationResponseEnum } from 'libs/stateless';
import type { ICheckIntegrationResponse, IEmailProvider, ISendMessageSuccessResponse } from 'libs/stateless';
import type { IEmailOptions } from 'libs/stateless';
import { BaseProvider, CasingEnum } from '../../../base.provider';
import type { WithPassthrough } from '../../../utils/types';

export class InfobipEmailProvider extends BaseProvider implements IEmailProvider {
  protected casing: CasingEnum = CasingEnum.CAMEL_CASE;
  channelType = ChannelTypeEnum.EMAIL as ChannelTypeEnum.EMAIL;
  id = EmailProviderIdEnum.Infobip;

  private infobipClient;

  constructor(
    private config: {
      baseUrl: string;
      apiKey: string;
      from?: string;
    }
  ) {
    super();
    this.infobipClient = new Infobip({
      baseUrl: this.config.baseUrl,
      apiKey: this.config.apiKey,
      authType: AuthType.ApiKey,
    });
  }

  async checkIntegration(options: IEmailOptions): Promise<ICheckIntegrationResponse> {
    try {
      await this.infobipClient.channels.email.send({
        to: options.to,
        from: this.config.from || options.from,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      return {
        success: true,
        message: 'Integrated successfully!',
        code: CheckIntegrationResponseEnum.SUCCESS,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        code: CheckIntegrationResponseEnum.FAILED,
      };
    }
  }

  async sendMessage(
    options: IEmailOptions,
    bridgeProviderData: WithPassthrough<Record<string, unknown>> = {}
  ): Promise<ISendMessageSuccessResponse> {
    const infobipResponse = await this.infobipClient.channels.email.send(
      this.transform(bridgeProviderData, {
        to: options.to,
        from: options.from || this.config.from,
        subject: options.subject,
        text: options.text,
        html: options.html,
      }).body
    );
    const { messageId } = infobipResponse.data.messages.pop()!;

    return {
      id: messageId,
      date: new Date().toISOString(),
    };
  }
}
