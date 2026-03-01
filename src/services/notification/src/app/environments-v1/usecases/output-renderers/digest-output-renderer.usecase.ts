import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InstrumentUsecase } from 'libs/application-generic';
import { DigestRenderOutput } from 'libs/shared';
import { RenderCommand } from './render-command';

@Injectable()
export class DigestOutputRendererUsecase {
  @InstrumentUsecase()
  execute(renderCommand: RenderCommand): DigestRenderOutput {
    const { skip, ...outputControls } = renderCommand.controlValues ?? {};

    return outputControls as any;
  }
}
