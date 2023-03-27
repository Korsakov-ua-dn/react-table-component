import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Locale } from 'shared/lib/intl';

type LangState = {
  locale: Locale;
};

const initialState: LangState = {
  locale: 'ru',
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      localStorage.setItem('locale', action.payload);
      state.locale = action.payload;
    },
    remindLocale(state) {
      const locale = localStorage.getItem('locale') as Locale;
      if (locale) {
        state.locale = locale;
      }
    },
  },
});

export const langActions = langSlice.actions;
export const langReducer = langSlice.reducer;
