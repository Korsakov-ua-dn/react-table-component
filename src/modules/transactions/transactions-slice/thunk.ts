import { createAsyncThunk } from '@reduxjs/toolkit';

import { transactionsApi } from '../../../services/transactions-api';
import { RootState } from '../../../store';

import type { ITransaction } from '../types';

export const fetchAllTransactions = createAsyncThunk<
  ITransaction[],
  undefined,
  { rejectValue: string; state: RootState }
>('transactions/GET_ALL', async (_, { rejectWithValue }) => {
  try {
    const response = await transactionsApi.getAll();
    return await response.data;
  } catch (err) {
    return rejectWithValue(
      'Произошла ошибка, попробуйте перезагрузить страницу'
    );
  }
});
