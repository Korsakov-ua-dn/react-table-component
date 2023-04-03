import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { DataFormat, Direction } from 'shared/ui/table-with-expanded-row';
import type { ITransaction } from 'shared/api';

export type Field = keyof ITransaction;
export type SortParams = {
  field: Field;
  format: DataFormat;
  direction: Direction;
} | null;

type TransactionSortState = {
  params: SortParams;
};

const initialState: TransactionSortState = {
  params: null,
};

const transactionSortSlice = createSlice({
  name: 'transaction-pagination',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<SortParams>) {
      state.params = action.payload;
    },
  },
});

export const transactionSortActions = transactionSortSlice.actions;
export const transactionSortReducer = transactionSortSlice.reducer;
