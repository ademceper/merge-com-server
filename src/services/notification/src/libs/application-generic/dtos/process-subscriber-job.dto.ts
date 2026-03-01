import { SubscriberEntity } from 'libs/dal';
import type { DiscoverWorkflowOutput } from 'libs/framework/internal';
import { StatelessControls, SubscriberSourceEnum, TriggerRequestCategoryEnum } from 'libs/shared';
import type { ISubscribersDefine, ITenantDefine } from 'libs/shared';
import type { TriggerOverrides } from 'libs/shared';

import type { IBulkJobParams, IJobParams } from '../services/queues/queue-base.service';
import type { SubscriberTopicPreference } from './subscriber-topic-preference.dto';

export interface IProcessSubscriberDataDto {
  environmentId: string;
  organizationId: string;
  userId: string;
  transactionId: string;
  requestId: string;
  identifier: string;
  payload: any;
  overrides: TriggerOverrides;
  tenant?: ITenantDefine;
  actor?: SubscriberEntity;
  contextKeys: string[];
  subscriber: ISubscribersDefine;
  templateId: string;
  _subscriberSource: SubscriberSourceEnum;
  topics?: SubscriberTopicPreference[];
  requestCategory?: TriggerRequestCategoryEnum;
  bridge?: { url: string; workflow: DiscoverWorkflowOutput };
  controls?: StatelessControls;
}

export interface IProcessSubscriberJobDto extends IJobParams {
  data?: IProcessSubscriberDataDto;
}

export interface IProcessSubscriberBulkJobDto extends IBulkJobParams {
  data: IProcessSubscriberDataDto;
}
