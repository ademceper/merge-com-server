import { Injectable } from '@nestjs/common';
import { LayoutEntity } from 'libs/dal';
import {
  LayoutSyncToEnvironmentCommand,
  LayoutSyncToEnvironmentUseCase,
} from '../../../../layouts-v2/usecases/sync-to-environment';
import type { ISyncContext } from '../../../types/sync.types';
import type { IBaseSyncService } from '../base/interfaces/base-sync.interface';

@Injectable()
export class LayoutSyncAdapter implements IBaseSyncService<LayoutEntity> {
  constructor(private readonly layoutSyncToEnvironmentUseCase: LayoutSyncToEnvironmentUseCase) {}

  async syncResourceToTarget(context: ISyncContext, resource: LayoutEntity): Promise<void> {
    await this.layoutSyncToEnvironmentUseCase.execute(
      LayoutSyncToEnvironmentCommand.create({
        user: { ...context.user, environmentId: context.sourceEnvironmentId },
        layoutIdOrInternalId: resource._id,
        targetEnvironmentId: context.targetEnvironmentId,
      })
    );
  }
}
