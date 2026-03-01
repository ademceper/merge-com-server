import { EnvironmentWithUserCommand } from 'libs/application-generic';
import { JobEntity, NotificationEntity } from 'libs/dal';
import { StatelessControls } from 'libs/shared';
import { IsDefined } from 'class-validator';

export type PartialNotificationEntity = Pick<
  NotificationEntity,
  | '_id'
  | '_templateId'
  | '_organizationId'
  | '_environmentId'
  | '_subscriberId'
  | 'transactionId'
  | 'channels'
  | 'to'
  | 'payload'
  | 'controls'
  | 'topics'
  | '_digestedNotificationId'
  | 'createdAt'
  | 'severity'
  | 'critical'
  | 'contextKeys'
  | 'tags'
>;

export class AddJobCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  jobId: string;

  @IsDefined()
  job: JobEntity;

  notification?: PartialNotificationEntity | null;

  controls?: StatelessControls;
}
