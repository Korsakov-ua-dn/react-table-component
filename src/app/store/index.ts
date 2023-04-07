import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { transactionReducer } from 'entities/transaction';

import { transactionSearchReducer } from 'features/transaction-search';
import { transactionPaginationReducer } from 'features/transaction-pagination';
import { transactionSortReducer } from 'features/transaction-table';

const rootReducer = combineReducers({
  transaction: transactionReducer,
  'transaction-search': transactionSearchReducer,
  'transaction-pagination': transactionPaginationReducer,
  'transaction-sort': transactionSortReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
