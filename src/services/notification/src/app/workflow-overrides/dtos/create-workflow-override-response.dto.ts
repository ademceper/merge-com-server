import type { ICreateWorkflowOverrideResponseDto } from 'libs/shared';
import { OverrideResponseDto } from './shared';

export class CreateWorkflowOverrideResponseDto
  extends OverrideResponseDto
  implements ICreateWorkflowOverrideResponseDto {}
