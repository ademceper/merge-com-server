import { EnvironmentWithUserObjectCommand } from 'libs/application-generic';
import { LayoutPreviewRequestDto } from '../../dtos/layout-preview-request.dto';

export class PreviewLayoutCommand extends EnvironmentWithUserObjectCommand {
  layoutIdOrInternalId: string;
  layoutPreviewRequestDto: LayoutPreviewRequestDto;
}
