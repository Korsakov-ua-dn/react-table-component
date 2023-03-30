import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { transactionReducer } from 'entities/transaction';

import { langReducer } from 'features/lang-select';
import { searchTransactionReducer } from 'features/searchTransaction';
import { transactionPaginationReducer } from 'features/transaction-pagination';

const rootReducer = combineReducers({
  lang: langReducer,
  transaction: transactionReducer,
  'search-transaction': searchTransactionReducer,
  'transaction-pagination': transactionPaginationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
