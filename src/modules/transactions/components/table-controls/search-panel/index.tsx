import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import SearchInput from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Translate } from '../../../../../utils';

import { ViewDataFormatScheme } from '../../table-component/table.types';

import SearchField from './search-field';

import './style.scss';

interface IProps<T> {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  searchField: keyof T | undefined;
  onSearch: (value: string) => void;
  onSelectField: (e: SelectChangeEvent) => void;
  translate: Translate<'table'>;
}

const SearchPanel = <T,>({
  viewDataFormatScheme,
  searchField,
  onSearch,
  onSelectField,
  translate,
}: IProps<T>): JSX.Element => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const callbacks = {
    onSelectFieldHandler: useCallback(
      (e: SelectChangeEvent) => {
        onSelectField(e);
        setError(false);
      },
      [onSelectField]
    ),

    onSearchHandler: useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!searchField) {
          setError(true);
        } else {
          setError(false);
          setValue(e.target.value);
          onSearch(e.target.value);
        }
      },
      [onSearch, searchField]
    ),
  };

  const selectOptions = useMemo(() => {
    const menuItems = [];

    for (const key in viewDataFormatScheme) {
      menuItems.push(
        <MenuItem key={key} value={key}>
          <em className="Search__field-option">
            {viewDataFormatScheme[key]?.title}
          </em>
        </MenuItem>
      );
    }
    return menuItems;
  }, [viewDataFormatScheme]);

  return (
    <div className="Search">
      <SearchField
        label={translate('field')}
        value={searchField}
        selectOptions={selectOptions}
        onSelectFieldHandler={callbacks.onSelectFieldHandler}
      />

      <SearchInput
        value={value}
        onChange={callbacks.onSearchHandler}
        id="search-input"
        label={translate('search')}
        helperText={error ? translate('search-error') : ' '}
        error={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        style={{ width: 120 }}
      />
    </div>
  );
};

export default React.memo(SearchPanel) as typeof SearchPanel;
