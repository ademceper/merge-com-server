import { Injectable } from '@nestjs/common';
import { LayoutEntity } from 'libs/dal';
import type { UserSessionData } from 'libs/shared';
import { WorkflowDataContainer } from '../../../../shared/containers/workflow-data.container';
import type { IResourceDiff } from '../../../types/sync.types';
import type { IBaseComparator } from '../base/interfaces/base-comparator.interface';
import { LayoutComparator } from '../comparators/layout.comparator';

@Injectable()
export class LayoutComparatorAdapter implements IBaseComparator<LayoutEntity> {
  constructor(private readonly layoutComparator: LayoutComparator) {}

  async compareResources(
    sourceResource: LayoutEntity,
    targetResource: LayoutEntity,
    _: UserSessionData
  ): Promise<{
    resourceChanges: {
      previous: Record<string, unknown> | null;
      new: Record<string, unknown> | null;
    } | null;
    otherDiffs?: IResourceDiff[];
  }> {
    const { layoutChanges } = await this.layoutComparator.compareLayouts(sourceResource, targetResource);

    return {
      resourceChanges: layoutChanges,
    };
  }
}
