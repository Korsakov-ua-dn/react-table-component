import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchAllTransactions } from './thunks';

import type { ITransaction } from 'shared/api';

type TransactionsState = {
  data: ITransaction[];
  loading: boolean;
  error: string | null;
};

const initialState: TransactionsState = {
  data: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
