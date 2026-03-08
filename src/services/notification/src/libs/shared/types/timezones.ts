/**
 * Timezone identifiers. Sourced and modified from the following:
 * @see https://github.com/joropeza/ts-timezone-enum
 */

export enum TimezoneEnum {
  ETC_UTC = 'Etc/UTC',
  }

export type Timezone = `${TimezoneEnum}`;
