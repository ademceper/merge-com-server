class FailedOperationEntity {
  message: string;
  subscriberId?: string;
}
class ChangedSubscriberEntity {
  subscriberId: string;
}

export class BulkCreateSubscriberEntity {
  updated: ChangedSubscriberEntity[];
  created: ChangedSubscriberEntity[];
  failed: FailedOperationEntity[];
}
