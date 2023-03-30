import React, { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { useTranslation } from 'shared/lib/intl';

import { searchTransactionActions } from '../../model';

import FieldSelect from '../field-select';
import SearchInput from '../search-input';
import { ComponentLayout } from '../component-layout';

import type { Scheme } from 'shared/ui/table-with-expanded-row';
import type { ITransaction } from 'shared/api/axios/transaction';

interface IProps {
  viewDataFormatScheme: Scheme<ITransaction>;
}

export const SearchPanel: React.FC<IProps> = React.memo(
  ({ viewDataFormatScheme }) => {
    const dispatch = useAppDispatch();
    const locale = useAppSelector((state) => state.lang.locale);
    const translate = useTranslation('table', locale);

    const searchField = useAppSelector(
      (state) => state['search-transaction'].params?.field
    );

    const [error, setError] = useState(false);

    const cb = {
      onSearch: useMemo(
        () =>
          debounce((value: string) => {
            dispatch(searchTransactionActions.setValue(value));
          }, 300),
        [dispatch]
      ),

      onSelectField: useCallback(
        (event: SelectChangeEvent<unknown>) => {
          const field = event.target.value as keyof ITransaction;
          dispatch(searchTransactionActions.setParams({ field, value: '' }));
        },
        [dispatch]
      ),
    };

    return (
      <ComponentLayout>
        <FieldSelect
          viewDataFormatScheme={viewDataFormatScheme}
          searchField={searchField}
          setError={setError}
          onSelectField={cb.onSelectField}
          translate={translate}
        />

        <SearchInput
          searchField={searchField}
          error={error}
          setError={setError}
          onSearch={cb.onSearch}
          translate={translate}
        />
        {error && (
          <span className="SearchTransactionPanel__error">
            {translate('search-error')}
          </span>
        )}
      </ComponentLayout>
    );
  }
);
