import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InstrumentUsecase, PinoLogger } from 'libs/application-generic';
import { LocalizationResourceEnum, NotificationTemplateEntity } from 'libs/dal';
import { SmsRenderOutput } from 'libs/shared';
import { BaseTranslationRendererUsecase } from './base-translation-renderer.usecase';
import { RenderCommand } from './render-command';

class SmsOutputRendererCommand extends RenderCommand {
  dbWorkflow: NotificationTemplateEntity;
  locale?: string;
}

@Injectable()
export class SmsOutputRendererUsecase extends BaseTranslationRendererUsecase {
  constructor(
    protected moduleRef: ModuleRef,
    protected logger: PinoLogger
  ) {
    super(moduleRef, logger);
  }

  @InstrumentUsecase()
  async execute(renderCommand: SmsOutputRendererCommand): Promise<SmsRenderOutput> {
    const { skip, ...outputControls } = renderCommand.controlValues ?? {};
    const { _environmentId, _organizationId, _id: workflowId } = renderCommand.dbWorkflow;

    const translatedControls = await this.processTranslations({
      controls: outputControls,
      variables: renderCommand.fullPayloadForRender,
      environmentId: _environmentId,
      organizationId: _organizationId,
      resourceId: workflowId,
      resourceType: LocalizationResourceEnum.WORKFLOW,
      locale: renderCommand.locale,
      resourceEntity: renderCommand.dbWorkflow,
      organization: renderCommand.organization,
    });

    return translatedControls as any;
  }
}
