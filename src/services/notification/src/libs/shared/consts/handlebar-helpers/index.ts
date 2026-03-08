export * from './getTemplateVariables';
export * from './handlebarHelpers';

const novuReservedVariableNames = ['body'];

export function isReservedVariableName(variableName: string) {
  return novuReservedVariableNames.includes(variableName);
}
