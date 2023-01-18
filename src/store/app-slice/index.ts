import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "../../components/react-table-component/translate/use-translate";

// slice
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

// types
type AppState = {
  locale: Locale;
};
