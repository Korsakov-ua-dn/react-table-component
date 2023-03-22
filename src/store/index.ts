import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { headerReducer } from '../modules/header';

import { transactionReducer } from '../modules/transactions';

const rootReducer = combineReducers({
  header: headerReducer,
  transactions: transactionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
