import { FC, memo, useCallback, useLayoutEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch } from 'shared/hooks';
import { Locale, locales, useLocaleSelector, useUpdate } from 'shared/intl';
import { capitalizeFirstLetter } from 'shared/lib';

// import { useLocaleContext } from 'app/providers/with-locale';

import { languageActions } from './model';

/**
 * Селект выбора языка локализации
 */
export const LanguageSelect: FC = memo(() => {
  const dispatch = useAppDispatch();
  // const { setLocale } = useTranslation('table');
  // const locale = useAppSelector((state) => state.language.locale);
  // const { locale, setLocale } = useLocaleContext();
  const value = useLocaleSelector((state) => state.value);
  const updateValue = useUpdate();

  const onChangeLocale = useCallback(
    (event: SelectChangeEvent) => {
      // dispatch(languageActions.setLocale(event.target.value as Locale));
      updateValue({ value: event.target.value as Locale });
      // setLocale(event.target.value as Locale);
    },
    [updateValue]
  );

  useLayoutEffect(() => {
    dispatch(languageActions.remindLocale());
  }, [dispatch]);

  return (
    <FormControl sx={{ m: 0 }} size="small">
      <Select value={value} onChange={onChangeLocale}>
        {locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {capitalizeFirstLetter(locale)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
