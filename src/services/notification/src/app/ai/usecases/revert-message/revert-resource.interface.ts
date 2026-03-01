import { SnapshotEntity } from 'libs/dal';
import type { UserSessionData } from 'libs/shared';

export interface RevertResourceStrategy {
  revert(snapshot: SnapshotEntity, user: UserSessionData): Promise<void>;
}
