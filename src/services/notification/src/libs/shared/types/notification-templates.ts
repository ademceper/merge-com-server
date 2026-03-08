import { ChannelTypeEnum } from './channel';

export enum WorkflowCreationSourceEnum {
  EDITOR = 'editor',
  BRIDGE = 'bridge',
  DASHBOARD = 'dashboard',
  }

export type WorkflowIntegrationStatus = {
  hasActiveIntegrations: boolean;
  hasPrimaryIntegrations?: boolean;
  channels: WorkflowChannelsIntegrationStatus;
};

export type WorkflowChannelsIntegrationStatus = ActiveIntegrationsStatus & ActiveIntegrationStatusWithPrimary;

type ActiveIntegrationsStatus = {
  [key in ChannelTypeEnum]: {
    hasActiveIntegrations: boolean;
  };
};

type ActiveIntegrationStatusWithPrimary = {
  [ChannelTypeEnum.EMAIL]: {
    hasActiveIntegrations: boolean;
    hasPrimaryIntegrations: boolean;
  };
  [ChannelTypeEnum.SMS]: {
    hasActiveIntegrations: boolean;
    hasPrimaryIntegrations: boolean;
  };
};

export enum TriggerContextTypeEnum {
  TENANT = 'tenant',
  ACTOR = 'actor',
}
