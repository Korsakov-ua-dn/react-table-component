import { FC, memo, useCallback, useLayoutEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { Locale, locales } from 'shared/lib/intl';

import { languageActions } from './model';

export const LanguageSelect: FC = memo(() => {
  const dispatch = useAppDispatch();

  const locale = useAppSelector((state) => state.language.locale);

  const onChangeLocale = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(languageActions.setLocale(event.target.value as Locale));
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    dispatch(languageActions.remindLocale());
  }, [dispatch]);

  return (
    <FormControl sx={{ m: 0 }} size="small">
      <Select value={locale} onChange={onChangeLocale}>
        {locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {locale}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
