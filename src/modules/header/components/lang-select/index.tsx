import React, { useCallback, useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Locale, locales } from '../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { headerActions } from '../../header-slice';

export const LangSelect: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const locale = useAppSelector((state) => state.header.locale);

  const onChangeLocale = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(headerActions.setLocale(event.target.value as Locale));
    },
    [dispatch]
  );

  const options = useMemo(() => {
    return Object.keys(locales);
  }, []);

  return (
    <FormControl sx={{ m: 0 }} size="small">
      <Select value={locale} onChange={onChangeLocale}>
        {options.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {locale}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
