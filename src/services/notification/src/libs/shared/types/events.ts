import type { ChannelTypeEnum } from './channel';
import type { TopicKey } from './topic';

export enum TriggerEventStatusEnum {
  ERROR = 'error',
  NOT_ACTIVE = 'trigger_not_active',
  PROCESSED = 'processed',
  TENANT_MISSING = 'no_tenant_found',
  INVALID_RECIPIENTS = 'invalid_recipients',
}

export interface IAttachmentOptions {
  mime: string;
  file: Buffer;
  name?: string;
  channels?: ChannelTypeEnum[];
  cid?: string;
  disposition?: string;
}

export interface IEmailOptions {
  to: string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
  attachments?: IAttachmentOptions[];
  id?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  payloadDetails?: any;
  notificationDetails?: any;
  ipPoolName?: string;
  customData?: Record<string, any>;
  headers?: Record<string, string>;
  senderName?: string;
  bridgeProviderData?: Record<string, unknown>;
}

export interface ITriggerPayload {
  attachments?: IAttachmentOptions[];
  [key: string]:
    | string
    | string[]
    | boolean
    | number
    | undefined
    | IAttachmentOptions
    | IAttachmentOptions[]
    | Record<string, unknown>;
}

export enum TriggerRecipientsTypeEnum {
  TOPIC = 'Topic',
}

export interface ITopic {
  type: TriggerRecipientsTypeEnum.TOPIC;
  topicKey: TopicKey;
  exclude?: string[];
}

type TriggerRecipientTopics = ITopic[];

export enum AddressingTypeEnum {
  BROADCAST = 'broadcast',
  MULTICAST = 'multicast',
}

export enum TriggerRequestCategoryEnum {
  SINGLE = 'single',
  BULK = 'bulk',
}
