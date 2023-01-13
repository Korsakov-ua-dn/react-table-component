import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transaction-slice";

const rootReducer = combineReducers({
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
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch