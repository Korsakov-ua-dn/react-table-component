import { memo, useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Locale, locales, useLocaleSelector, useSetLocale } from 'shared/intl';
import { capitalizeFirstLetter } from 'shared/lib';

/**
 * Селект выбора языка локализации
 */
export const LanguageSelect: React.FC = memo(() => {
  const locale = useLocaleSelector();
  const setLocale = useSetLocale();

  const onChangeLocale = useCallback(
    (event: SelectChangeEvent) => {
      setLocale(event.target.value as Locale);
      localStorage.setItem('locale', event.target.value);
    },
    [setLocale]
  );

  return (
    <FormControl sx={{ m: 0 }} size="small">
      <Select value={locale} onChange={onChangeLocale}>
        {locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {capitalizeFirstLetter(locale)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
