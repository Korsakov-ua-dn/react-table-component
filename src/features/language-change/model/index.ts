import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Locale } from 'shared/lib/intl';

import { isLocale } from '../lib';

type LanguageState = {
  locale: Locale;
};

const initialState: LanguageState = {
  locale: 'ru',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      localStorage.setItem('locale', action.payload);
      state.locale = action.payload;
    },
    remindLocale(state) {
      const locale = localStorage.getItem('locale');

      if (isLocale(locale)) {
        state.locale = locale;
      }
    },
  },
});

export const languageActions = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
