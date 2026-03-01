import { BaseCommand } from 'libs/application-generic';
import { OrganizationEntity } from 'libs/dal';
import type { ContextResolved } from 'libs/framework/internal';
import { LAYOUT_CONTENT_VARIABLE } from 'libs/shared';

export class RenderCommand extends BaseCommand {
  controlValues: Record<string, unknown>;
  fullPayloadForRender: FullPayloadForRender;
  organization?: OrganizationEntity;
}
export class FullPayloadForRender {
  workflow?: Record<string, unknown>;
  subscriber: Record<string, unknown>;
  payload: Record<string, unknown>;
  context?: ContextResolved;
  steps: Record<string, unknown>; // step.stepId.unknown
  // this variable is used to pass the layout content to the renderer
  [LAYOUT_CONTENT_VARIABLE]?: string;
}
