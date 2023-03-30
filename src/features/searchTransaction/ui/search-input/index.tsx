import React, { ChangeEvent, useCallback, useState } from 'react';

import InputSearchMui from 'shared/ui/input-search-mui';

import type { Translate } from 'shared/lib/intl';
import type { Scheme } from 'shared/ui/table-with-expanded-row';
import type { ITransaction } from 'shared/api/axios/transaction';

interface IProps {
  searchField: keyof Scheme<ITransaction> | undefined;
  error: boolean;
  setError: (value: boolean) => void;
  onSearch: (value: string) => void;
  translate: Translate<'table'>;
}

const SearchInput = ({
  searchField,
  error,
  setError,
  onSearch,
  translate,
}: IProps): JSX.Element => {
  const [value, setValue] = useState('');

  const onSearchHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!searchField) {
        setError(true);
      } else {
        setError(false);
        setValue(e.target.value);
        onSearch(e.target.value);
      }
    },
    [onSearch, searchField, setError]
  );

  return (
    <InputSearchMui
      value={value}
      onChange={onSearchHandler}
      id="search-transaction-input"
      label={translate('search')}
      // helperText={error ? translate('search-error') : ''}
      error={error}
    />
  );
};

export default React.memo(SearchInput) as typeof SearchInput;
