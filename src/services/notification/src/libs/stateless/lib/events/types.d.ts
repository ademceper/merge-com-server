import { ChannelTypeEnum } from '../template/template.interface';
import type { IMessage, ITriggerPayload } from '../template/template.interface';

export interface IPreSendEvent {
  id: string;
  channel: ChannelTypeEnum;
  message: IMessage;
  triggerPayload: ITriggerPayload;
}

export interface IPostSendEvent {
  id: string;
  channel: ChannelTypeEnum;
  message: IMessage;
  triggerPayload: ITriggerPayload;
}
