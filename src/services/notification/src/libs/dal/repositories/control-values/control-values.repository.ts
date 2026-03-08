import { ControlValuesLevelEnum } from 'libs/shared';
import type { ClientSession } from 'mongoose';
import type { SoftDeleteModel } from 'mongoose-delete';
import type { EnforceEnvOrOrgIds } from '../../types';
import { BaseRepository } from '../base-repository';
import { ControlValuesEntity } from './control-values.entity';
import { ControlValues } from './control-values.schema';
import type { ControlValuesModel } from './control-values.schema';

interface DeleteManyValuesQuery {
  _environmentId: string;
  _organizationId: string;
  _workflowId?: string;
  _stepId?: string;
  _layoutId?: string;
  level?: ControlValuesLevelEnum;
}

interface FindControlValuesQuery {
  _environmentId: string;
  _organizationId: string;
  _workflowId?: string;
  _stepId?: string;
  _layoutId?: string;
  level?: ControlValuesLevelEnum;
  [key: string]: unknown;
}

export class ControlValuesRepository extends BaseRepository<
  ControlValuesModel,
  ControlValuesEntity,
  EnforceEnvOrOrgIds
> {
  private controlValues: SoftDeleteModel;

  constructor() {
    super(ControlValues, ControlValuesEntity);
    this.controlValues = ControlValues;
  }

  async deleteMany(
    query: DeleteManyValuesQuery,
    options: {
      session?: ClientSession | null;
    } = {}
  ) {
    return await super.delete(query, options);
  }

  async findMany(query: FindControlValuesQuery): Promise<ControlValuesEntity[]> {
    return await super.find(query);
  }

  async findFirst(query: FindControlValuesQuery): Promise<ControlValuesEntity | null> {
    return await this.findOne(query);
  }
}
