import type { ITenantDefine } from 'libs/shared';
import { IsDefined } from 'class-validator';

import { EnvironmentWithUserCommand } from '../../commands';

export class ProcessTenantCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  tenant: ITenantDefine;
}
