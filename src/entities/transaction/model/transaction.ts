import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITransaction } from 'shared/api/axios/transaction';

import { fetchAllTransactions } from './thunks';

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

// export const transactionActions = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
