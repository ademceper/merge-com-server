import { generateObjectId } from 'libs/application-generic';

export function generateTransactionId() {
  return `txn_${generateObjectId()}`;
}
