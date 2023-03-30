import { createAsyncThunk } from '@reduxjs/toolkit';

import { ITransaction, transactionAPI } from 'shared/api';

export const fetchAllTransactions = createAsyncThunk<
  ITransaction[],
  undefined,
  { rejectValue: string; state: RootState }
>('transactions/GET_ALL', async (_, { rejectWithValue }) => {
  try {
    const response = await transactionAPI.getAll();

    if (!isArray(response.data) || !isTransaction(response.data[0])) {
      return rejectWithValue('Не корректный ответ сервера');
    }

    return response.data;
  } catch (err) {
    return rejectWithValue(
      'Произошла ошибка, попробуйте перезагрузить страницу'
    );
  }
});

function isTransaction(value: unknown): value is ITransaction {
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

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function isArray(value: unknown): value is Array<object> {
  return Array.isArray(value);
}
