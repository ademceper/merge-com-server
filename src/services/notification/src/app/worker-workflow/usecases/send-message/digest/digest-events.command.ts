import { BaseCommand } from 'libs/application-generic';
import { JobEntity } from 'libs/dal';
import { IsDefined } from 'class-validator';

export class DigestEventsCommand extends BaseCommand {
  @IsDefined()
  _subscriberId: string;

  @IsDefined()
  currentJob: JobEntity;
}
