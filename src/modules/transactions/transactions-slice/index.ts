import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchAllTransactions } from './thunk';

import type { ITransaction } from '../types';

type TransactionsState = {
  data: ITransaction[];
  limit: number;
  page: number;
  loading: boolean;
  error: string | null;
};

const initialState: TransactionsState = {
  data: [],
  limit: 25,
  page: 0,
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 0;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
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

export const transactionActions = transactionsSlice.actions;
export const transactionReducer = transactionsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
