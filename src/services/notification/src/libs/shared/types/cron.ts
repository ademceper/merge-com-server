/**
 * Cron expression enum. Taken from:
 * @see https://github.com/nestjs/schedule/blob/master/lib/enums/cron-expression.enum.ts
 */
export enum CronExpressionEnum {
  EVERY_10_SECONDS = '*/10 * * * * *',
  EVERY_30_SECONDS = '*/30 * * * * *',
  }
