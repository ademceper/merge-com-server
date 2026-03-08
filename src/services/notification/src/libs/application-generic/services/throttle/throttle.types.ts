export interface IThrottleReservationParams {
  environmentId: string;
  subscriberId: string;
  workflowId: string;
  stepId: string;
  jobId: string;
  windowMs: number;
  limit: number;
  nowMs: number;
  throttleKey?: string;
  throttleValue?: string;
}

export interface IThrottleReservationResult {
  granted: boolean;
  count: number;
  ttlMs: number;
  windowStartMs: number;
}

interface IThrottleReleaseParams {
  environmentId: string;
  subscriberId: string;
  workflowId: string;
  stepId: string;
  jobId: string;
  windowMs: number;
  nowMs: number;
  throttleKey?: string;
  throttleValue?: string;
}

interface IThrottleReleaseResult {
  released: boolean;
  count: number;
  ttlMs: number;
}
