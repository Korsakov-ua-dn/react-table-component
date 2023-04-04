import { createAsyncThunk } from '@reduxjs/toolkit';

import { ITransaction, transactionAPI } from 'shared/api';
import { isArray } from 'shared/type-guard';

import { isTransaction } from '../lib';

/**
 * Thunk
 * @returns Возвращает массив транзакций полученных из API или ошибку
 */
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
