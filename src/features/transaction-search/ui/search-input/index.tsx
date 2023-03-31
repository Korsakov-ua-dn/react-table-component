import React, { ChangeEvent, useCallback } from 'react';

import InputSearchMui from 'shared/ui/input-search-mui';

interface IProps {
  value: string;
  error: boolean;
  onSearch: (value: string) => void;
  label: string;
}

const SearchInput = ({
  error,
  value,
  onSearch,
  label,
}: IProps): JSX.Element => {
  const onSearchHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch]
  );

  return (
    <InputSearchMui
      value={value}
      onChange={onSearchHandler}
      id="search-transaction-input"
      label={label}
      error={error}
    />
  );
};

export default React.memo(SearchInput) as typeof SearchInput;
