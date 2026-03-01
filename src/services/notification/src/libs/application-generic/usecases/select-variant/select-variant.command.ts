import { JobEntity, NotificationStepEntity, TenantEntity } from 'libs/dal';
import { IsDefined } from 'class-validator';

import { EnvironmentWithUserCommand } from '../../commands';
import type { IFilterVariables } from '../../utils/filter-processing-details';

export class SelectVariantCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  filterData: IFilterVariables;

  @IsDefined()
  step: NotificationStepEntity;

  @IsDefined()
  job: JobEntity;
}
