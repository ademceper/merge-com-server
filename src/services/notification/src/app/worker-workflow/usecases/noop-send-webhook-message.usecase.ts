import { Injectable } from '@nestjs/common';
import { SendWebhookMessageCommand } from 'libs/application-generic';

@Injectable()
export class NoopSendWebhookMessage {
  async execute(_command: SendWebhookMessageCommand): Promise<{ eventId: string } | undefined> {
    return undefined;
  }
}
