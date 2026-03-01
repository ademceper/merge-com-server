import { IGroupedBlueprint } from 'libs/shared';

export class GroupedBlueprintResponse {
  general: IGroupedBlueprint[];
  popular: IGroupedBlueprint;
}
