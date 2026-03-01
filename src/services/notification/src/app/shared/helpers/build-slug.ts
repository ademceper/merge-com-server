import { encodeBase62 } from 'libs/application-generic';
import { ShortIsPrefixEnum, slugify } from 'libs/shared';
import type { Slug } from 'libs/shared';

const SLUG_DELIMITER = '_';

/**
 * Builds a slug for a step based on the step name, the short prefix and the internal ID.
 * @returns The slug for the entity, example:  slug: "workflow-name_wf_AbC1Xyz9KlmNOpQr"
 */
export function buildSlug(entityName: string, shortIsPrefix: ShortIsPrefixEnum, internalId: string): Slug {
  return `${slugify(entityName)}${SLUG_DELIMITER}${shortIsPrefix}${encodeBase62(internalId)}`;
}
