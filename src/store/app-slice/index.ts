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
      localStorage.setItem('locale', action.payload);
      state.locale = action.payload;
    },
    remindLocale(state) {
      const locale = localStorage.getItem('locale') as Locale;
      if (locale) {
        state.locale = locale
      }
    }
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;