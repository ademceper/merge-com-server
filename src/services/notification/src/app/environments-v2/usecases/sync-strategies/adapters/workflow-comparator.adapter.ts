import { Injectable } from '@nestjs/common';
import { NotificationTemplateEntity } from 'libs/dal';
import type { UserSessionData } from 'libs/shared';
import { WorkflowDataContainer } from '../../../../shared/containers/workflow-data.container';
import type { IResourceDiff } from '../../../types/sync.types';
import type { IBaseComparator } from '../base/interfaces/base-comparator.interface';
import { WorkflowComparator } from '../comparators/workflow.comparator';

@Injectable()
export class WorkflowComparatorAdapter implements IBaseComparator<NotificationTemplateEntity> {
  constructor(private readonly workflowComparator: WorkflowComparator) {}

  async compareResources(
    sourceResource: NotificationTemplateEntity,
    targetResource: NotificationTemplateEntity,
    userContext: UserSessionData,
    workflowDataContainer?: WorkflowDataContainer
  ): Promise<{
    resourceChanges: {
      previous: Record<string, unknown> | null;
      new: Record<string, unknown> | null;
    } | null;
    otherDiffs?: IResourceDiff[];
  }> {
    const { workflowChanges, otherDiffs } = await this.workflowComparator.compareWorkflows(
      sourceResource,
      targetResource,
      userContext,
      workflowDataContainer
    );

    return {
      resourceChanges: workflowChanges,
      otherDiffs,
    };
  }
}
