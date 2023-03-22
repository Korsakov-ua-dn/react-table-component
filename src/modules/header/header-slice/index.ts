import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Locale } from '../../../utils';

type HeaderState = {
  locale: Locale;
};

const initialState: HeaderState = {
  locale: 'ru',
};

const headerSlice = createSlice({
  name: 'header',
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

export const headerActions = headerSlice.actions;
export const headerReducer = headerSlice.reducer;
