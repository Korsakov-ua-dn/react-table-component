import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { useTranslation } from 'shared/lib/intl';

import { transactionSearchActions } from '../../model';

import FieldSelect from '../field-select';
import SearchInput from '../search-input';
import { ComponentLayout } from '../component-layout';

import type { Scheme } from 'shared/ui/table-with-expanded-row';
import type { ITransaction } from 'shared/api/axios/transaction';

interface IProps {
  viewDataFormatScheme: Scheme<ITransaction>;
}

export const SearchPanel: React.FC<IProps> = memo(
  ({ viewDataFormatScheme }) => {
    const dispatch = useAppDispatch();
    const locale = useAppSelector((state) => state.language.locale);
    const translate = useTranslation('table', locale);

    const searchField = useAppSelector(
      (state) => state['transaction-search'].params?.field
    );
    const isField = !!searchField;

    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const dispatchEventRef = useRef(
      debounce(
        (value: string) => dispatch(transactionSearchActions.setValue(value)),
        300
      )
    );

    const cb = {
      onSearchHandler: useCallback(
        (value: string) => {
          if (!isField) {
            setError(true);
          } else {
            setError(false);
            setValue(value);
            dispatchEventRef.current(value);
          }
        },
        [isField]
      ),

      onSelectField: useCallback(
        (event: SelectChangeEvent<unknown>) => {
          setValue('');
          const field = event.target.value as keyof ITransaction;
          dispatch(transactionSearchActions.setParams({ field, value: '' }));
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
          value={value}
          error={error}
          onSearch={cb.onSearchHandler}
          label={translate('search')}
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
