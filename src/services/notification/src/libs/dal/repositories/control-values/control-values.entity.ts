import { ControlValuesLevelEnum } from 'libs/shared';

export class ControlValuesEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
  _environmentId: string;
  _organizationId: string;
  level: ControlValuesLevelEnum;
  priority: number;
  controls: Record<string, unknown>;
  _workflowId?: string;
  _stepId?: string;
  _layoutId?: string;
}
