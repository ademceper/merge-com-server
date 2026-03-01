import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PinoLogger } from 'libs/application-generic';
import { ChangeRepository } from 'libs/dal';
import { ChangeEntityTypeEnum } from 'libs/shared';
import { PromoteTypeChangeCommand } from '../promote-type-change.command';

// Lazy import to break circular dependency:
// promote-translation-change -> apply-change -> promote-change-to-environment -> promote-translation-change
const getApplyChangeRef = () => require('../apply-change/apply-change.usecase').ApplyChange;
const getApplyChangeCommandRef = () => require('../apply-change/apply-change.command').ApplyChangeCommand;

@Injectable()
export class PromoteTranslationChange {
  constructor(
    private moduleRef: ModuleRef,
    @Inject(forwardRef(getApplyChangeRef)) private applyChange: any,
    private changeRepository: ChangeRepository,
    private logger: PinoLogger
  ) {
    this.logger.setContext(this.constructor.name);
  }

  async execute(command: PromoteTypeChangeCommand) {
    try {
      if (process.env.NOVU_ENTERPRISE === 'true' || process.env.CI_EE_TEST === 'true') {
        if (!require('@novu/ee-translation')?.PromoteTranslationChange) {
          throw new BadRequestException('Translation module is not loaded');
        }
        const usecase = this.moduleRef.get(require('@novu/ee-translation')?.PromoteTranslationChange, {
          strict: false,
        });
        await usecase.execute(command, this.applyGroupChange.bind(this));
      }
    } catch (e) {
      this.logger.error({ err: e }, `Unexpected error while importing enterprise modules`);
    }
  }

  private async applyGroupChange(command: PromoteTypeChangeCommand) {
    const newItem = command.item as {
      _groupId: string;
    };

    const changes = await this.changeRepository.getEntityChanges(
      command.organizationId,
      ChangeEntityTypeEnum.TRANSLATION_GROUP,
      newItem._groupId
    );

    const ApplyChangeCommand = getApplyChangeCommandRef();

    for (const change of changes) {
      await this.applyChange.execute(
        ApplyChangeCommand.create({
          changeId: change._id,
          environmentId: change._environmentId,
          organizationId: change._organizationId,
          userId: command.userId,
        })
      );
    }
  }
}
