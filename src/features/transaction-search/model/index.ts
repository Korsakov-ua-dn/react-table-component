import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ITransaction } from 'shared/api/axios/transaction';
import type { Scheme } from 'shared/ui/table-with-expanded-row';

export type Field = keyof Scheme<ITransaction>;
export type Params = { field: Field; value: string } | null;
type TransactionSearchState = {
  params: Params;
};

const initialState: TransactionSearchState = {
  params: null,
};

const transactionSearchSlice = createSlice({
  name: 'transaction-search',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<Params>) {
      state.params = action.payload;
      if (state.params) {
        state.params.value = '';
      }
    },
    setValue(state, action: PayloadAction<string>) {
      if (state.params) {
        state.params.value = action.payload;
      }
    },
  },
});

export const transactionSearchActions = transactionSearchSlice.actions;
export const transactionSearchReducer = transactionSearchSlice.reducer;

export const transactionSearchSetValue =
  transactionSearchSlice.actions.setValue.type;
