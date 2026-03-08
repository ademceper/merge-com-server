import type { EnforceEnvOrOrgIds } from '../../types/enforce';
import { BaseRepository } from '../base-repository';
import { LocalizationEntity } from './localization.entity';
import type { LocalizationDBModel } from './localization.entity';
import { Localization } from './localization.schema';

class LocalizationRepository extends BaseRepository<
  LocalizationDBModel,
  LocalizationEntity,
  EnforceEnvOrOrgIds
> {
  constructor() {
    super(Localization, LocalizationEntity);
  }
}
