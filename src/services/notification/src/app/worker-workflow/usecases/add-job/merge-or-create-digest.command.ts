import { BaseCommand } from 'libs/application-generic';

import { JobEntity } from 'libs/dal';
import { IsDefined } from 'class-validator';

export class MergeOrCreateDigestCommand extends BaseCommand {
  @IsDefined()
  job: JobEntity;
}
