import { ITransaction } from 'shared/api';
import { isObject } from 'shared/type-guard';

// type guard
export function isTransaction(value: unknown): value is ITransaction {
  if (!isObject(value)) return false;

  if (
    '_id' in value &&
    typeof value._id === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'date' in value &&
    typeof value.date === 'string' &&
    'card' in value &&
    typeof value.card === 'number' &&
    Number.isInteger(value.card) &&
    'point' in value &&
    typeof value.point === 'string' &&
    'address' in value &&
    typeof value.address === 'string' &&
    'fuelName' in value &&
    typeof value.fuelName === 'string' &&
    'fuelCount' in value &&
    typeof value.fuelCount === 'number' &&
    'coast' in value &&
    typeof value.coast === 'number' &&
    '__v' in value &&
    typeof value.__v === 'number'
  ) {
    return true;
  }

  return false;
}
