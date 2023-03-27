import { createAsyncThunk } from '@reduxjs/toolkit';

import { axios } from 'shared/api';

export const fetchAllTransactions = createAsyncThunk<
  axios.transaction.ITransaction[],
  undefined,
  { rejectValue: string; state: RootState }
>('transactions/GET_ALL', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.transaction.getAll();
    return response.data;
  } catch (err) {
    return rejectWithValue(
      'Произошла ошибка, попробуйте перезагрузить страницу'
    );
  }
});
