import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ITransaction } from 'shared/api/axios/transaction';
import type { Scheme } from 'shared/ui/table-with-expanded-row';

export type Field = keyof Scheme<ITransaction>;
export type Params = { field: Field; value: string } | null;
type SearchTransactionState = {
  params: Params;
};

const initialState: SearchTransactionState = {
  params: null,
};

const searchTransactionSlice = createSlice({
  name: 'search-transaction',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<Params>) {
      state.params = action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      if (state.params) {
        state.params.value = action.payload;
      }
    },
  },
});

export const searchTransactionActions = searchTransactionSlice.actions;
export const searchTransactionReducer = searchTransactionSlice.reducer;
