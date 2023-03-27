import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { langReducer } from 'features/lang-select';
import { transactionReducer } from 'modules/transactions';

const rootReducer = combineReducers({
  lang: langReducer,
  transactions: transactionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
