import { ChannelTypeEnum, ResourceOriginEnum, ResourceTypeEnum } from '../../types';
import type { IEmailBlock, ITemplateVariable } from '../../types';
import { RuntimeIssue } from '../../utils/issues';
import { Controls, JSONSchemaDto } from '../workflows';

class LayoutDto {
  _id?: string;
  _organizationId: string;
  _environmentId: string;
  _creatorId: string;
  _parentId?: string;
  name: string;
  identifier: string;
  description?: string;
  channel: ChannelTypeEnum;
  content: IEmailBlock[];
  contentType: string;
  variables?: ITemplateVariable[];
  isDefault: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: any;
}

enum LayoutCreationSourceEnum {
  DASHBOARD = 'dashboard',
}

type CreateLayoutDto = {
  layoutId: string;
  name: string;
  isTranslationEnabled?: boolean;
  __source: LayoutCreationSourceEnum;
};

export type EmailControlsDto = {
  body: string;
  editorType: 'html' | 'block';
};

export type LayoutControlValuesDto = {
  email?: EmailControlsDto;
};

type UpdateLayoutDto = {
  name: string;
  isTranslationEnabled?: boolean;
  controlValues: LayoutControlValuesDto;
};

type DuplicateLayoutDto = {
  name: string;
  isTranslationEnabled?: boolean;
};

type LayoutCreateAndUpdateKeys = keyof CreateLayoutDto | keyof UpdateLayoutDto;

type LayoutResponseDto = {
  _id: string;
  slug: string;
  layoutId: string;
  name: string;
  isDefault: boolean;
  updatedAt: string;
  createdAt: string;
  origin: ResourceOriginEnum;
  type: ResourceTypeEnum;
  controls: Controls;
  variables?: JSONSchemaDto;
  isTranslationEnabled: boolean;
};

type ListLayoutsResponse = {
  layouts: LayoutResponseDto[];
  totalCount: number;
};

export class LayoutIssuesDto {
  controls?: Record<string, RuntimeIssue[]>;
}
