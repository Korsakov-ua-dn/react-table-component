import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    },
  },
});

export const transactionPaginationActions = transactionPaginationSlice.actions;
export const transactionPaginationReducer = transactionPaginationSlice.reducer;
