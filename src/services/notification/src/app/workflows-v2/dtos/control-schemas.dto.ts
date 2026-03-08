import { JSONSchemaDto } from '../../shared/dtos/json-schema.dto';
import { UiSchema } from './ui-schema.dto';

class ControlSchemasDto {
  schema: JSONSchemaDto;
  uiSchema?: UiSchema;
}
