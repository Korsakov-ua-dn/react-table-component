import React, { useCallback, useMemo } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import SelectMUI from 'shared/ui/select-mui';
import { hasOwn } from 'shared/lib';

import './style.scss';

import type { Translate } from 'shared/lib/intl';
import type { Scheme } from 'shared/ui/table-with-expanded-row';
import type { ITransaction } from 'entities/transaction';

interface IProps {
  scheme: Scheme<ITransaction>;
  searchField: keyof Scheme<ITransaction> | undefined;
  setError: (value: boolean) => void;
  onSelectField: (event: SelectChangeEvent<unknown>) => void;
  translate: Translate<'table'>;
}

const FieldSelect = ({
  scheme,
  searchField,
  setError,
  onSelectField,
  translate,
}: IProps): JSX.Element => {
  const onSelectFieldHandler = useCallback(
    (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
      onSelectField(event);
      setError(false);
    },
    [onSelectField, setError]
  );

  const selectOptions = useMemo(() => {
    const menuItems = [];

    for (const key in scheme) {
      if (hasOwn(scheme, key)) {
        menuItems.push(
          <MenuItem style={{ fontStyle: 'normal' }} key={key} value={key}>
            {scheme[key]?.title}
          </MenuItem>
        );
      }
    }
    return menuItems;
  }, [scheme]);

  return (
    <div className="FieldSelect">
      <SelectMUI
        label={translate('field')}
        value={searchField ? searchField : ''}
        onChange={onSelectFieldHandler}
      >
        {selectOptions}
      </SelectMUI>
    </div>
  );
};

export default React.memo(FieldSelect) as typeof FieldSelect;
