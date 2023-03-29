import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { langReducer } from 'features/lang-select';
import { searchTransactionReducer } from 'features/searchTransaction';
import { transactionPaginationReducer } from 'features/transaction-pagination';
import { transactionReducer } from 'modules/transactions';

const rootReducer = combineReducers({
  lang: langReducer,
  transactions: transactionReducer,
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
