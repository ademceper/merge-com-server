import { Injectable } from '@nestjs/common';
import { InstrumentUsecase } from 'libs/application-generic';
import { JsonSchemaTypeEnum } from 'libs/dal';
import { LAYOUT_CONTENT_VARIABLE } from 'libs/shared';

import { JSONSchemaDto } from '../../../shared/dtos/json-schema.dto';
import { CreateVariablesObjectCommand } from '../../../shared/usecases/create-variables-object/create-variables-object.command';
import { CreateVariablesObject } from '../../../shared/usecases/create-variables-object/create-variables-object.usecase';
import { buildContextSchema, buildSubscriberSchema } from '../../../shared/utils/create-schema';
import { LayoutVariablesSchemaCommand } from './layout-variables-schema.command';

@Injectable()
export class LayoutVariablesSchemaUseCase {
  constructor(private readonly createVariablesObject: CreateVariablesObject) {}

  @InstrumentUsecase()
  async execute(command: LayoutVariablesSchemaCommand): Promise<JSONSchemaDto> {
    const { controlValues } = command;

    const { subscriber, context } = await this.createVariablesObject.execute(
      CreateVariablesObjectCommand.create({
        environmentId: command.environmentId,
        organizationId: command.organizationId,
        controlValues: Object.values(controlValues?.email ?? {}),
      })
    );

    return {
      type: JsonSchemaTypeEnum.OBJECT,
      properties: {
        subscriber: buildSubscriberSchema(subscriber),
        [LAYOUT_CONTENT_VARIABLE]: {
          type: JsonSchemaTypeEnum.STRING,
        },
        context: buildContextSchema(context),
      },
      additionalProperties: false,
    };
  }
}
