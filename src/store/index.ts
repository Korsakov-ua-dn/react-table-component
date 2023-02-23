import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appReducer from './app-slice';
import transactionReducer from './transactions-slice';

const rootReducer = combineReducers({
  app: appReducer,
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
