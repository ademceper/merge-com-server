import type { NotificationTopic } from 'libs/dal';

export type SubscriberTopicPreference = NotificationTopic & {
  _topicSubscriptionId?: string;
  subscriptionIdentifier?: string;
};
