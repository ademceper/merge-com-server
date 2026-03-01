import { IEventBody } from 'libs/stateless';

export interface IWebhookResult {
  id: string;
  event: IEventBody;
}
