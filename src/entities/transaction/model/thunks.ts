import { createAsyncThunk } from '@reduxjs/toolkit';

import { transactionAPI } from 'shared/api';
import { isArray } from 'shared/type-guard';

import { ITransaction, formatTransactionData, isTransaction } from '../lib';

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

    return response.data.map((transaction) =>
      formatTransactionData(transaction)
    );
  } catch (err) {
    return rejectWithValue(
      'Произошла ошибка, попробуйте перезагрузить страницу'
    );
  }
});
