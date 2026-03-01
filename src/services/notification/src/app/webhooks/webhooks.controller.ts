import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common';

import type { IWebhookResult } from './dtos/webhooks-response.dto';
import { WebhookCommand } from './usecases/webhook/webhook.command';
import { Webhook } from './usecases/webhook/webhook.usecase';

@Controller({ path: '/webhooks', version: VERSION_NEUTRAL })
@UseInterceptors(ClassSerializerInterceptor)
export class WebhooksController {
  constructor(private webhookUsecase: Webhook) {}

  @Post('/organizations/:organizationId/environments/:environmentId/email/:providerOrIntegrationId')
  public emailWebhook(
    @Param('organizationId') organizationId: string,
    @Param('environmentId') environmentId: string,
    @Param('providerOrIntegrationId') providerOrIntegrationId: string,
    @Body() body: any
  ): Promise<IWebhookResult[]> {
    return this.webhookUsecase.execute(
      WebhookCommand.create({
        environmentId,
        organizationId,
        providerOrIntegrationId,
        body,
        type: 'email',
      })
    );
  }

  @Post('/organizations/:organizationId/environments/:environmentId/sms/:providerOrIntegrationId')
  public smsWebhook(
    @Param('organizationId') organizationId: string,
    @Param('environmentId') environmentId: string,
    @Param('providerOrIntegrationId') providerOrIntegrationId: string,
    @Body() body: any
  ): Promise<IWebhookResult[]> {
    return this.webhookUsecase.execute(
      WebhookCommand.create({
        environmentId,
        organizationId,
        providerOrIntegrationId,
        body,
        type: 'sms',
      })
    );
  }
}
