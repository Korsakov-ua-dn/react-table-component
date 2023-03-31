import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { transactionSearchSetValue } from 'features/transaction-search';

import { DEFAULT_LIMIT } from '../config';

type TransactionPaginationState = {
  page: number;
  limit: number;
};

const initialState: TransactionPaginationState = {
  page: 0,
  limit: DEFAULT_LIMIT,
};

const transactionPaginationSlice = createSlice({
  name: 'transaction-pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 0;
    },
  },
  extraReducers: {
    [transactionSearchSetValue]: (state) => {
      state.page = 0;
    },
  },
});

export const transactionPaginationActions = transactionPaginationSlice.actions;
export const transactionPaginationReducer = transactionPaginationSlice.reducer;
