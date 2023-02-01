import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "../../utils/translate/use-translate";

type AppState = {
  locale: Locale;
};

const initialState: AppState = {
  locale: "ru",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;