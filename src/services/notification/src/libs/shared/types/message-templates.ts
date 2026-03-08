import { TemplateVariableTypeEnum } from './channel';

export enum EmailBlockTypeEnum {
  }

export enum TextAlignEnum {
  }

export interface IEmailBlock {
  type: EmailBlockTypeEnum;
  content: string;
  url?: string;
  styles?: {
    textAlign?: TextAlignEnum;
  };
}

export interface ITemplateVariable {
  type: TemplateVariableTypeEnum;
  name: string;
  required?: boolean;
  defaultValue?: string | boolean;
}

export type MessageTemplateContentType = 'editor' | 'customHtml';

export enum ButtonTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum MessageActionStatusEnum {
  PENDING = 'pending',
  DONE = 'done',
}
