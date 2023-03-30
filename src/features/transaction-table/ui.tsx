import { FC, useCallback, useRef, useState } from 'react';

import { Table, Tbody, Thead } from 'shared/ui/table-with-expanded-row';
import { useAppSelector } from 'shared/hooks';

import { getTransactionsByPage } from 'modules/transactions/transactions-slice/selectors';

import ExpandedContent from 'containers/expanded-content'; // @todo

import { SortType, scheme } from './config';

import type { ITransaction } from 'shared/api';

export const TransactionTable: FC = () => {
  const transactionsByPage = useAppSelector(getTransactionsByPage);

  const [sort, setSort] = useState<SortType>(null);

  // Три рефа нужны для печати пдф
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const callbacks = {
    onSort: useCallback((field: keyof ITransaction) => {
      const format = scheme[field]?.format!;
      setSort((prev) => {
        if (prev?.field !== field || prev?.direction === 'none') {
          return { field, format, direction: 'ascending' };
        }
        if (prev?.direction === 'ascending') {
          return { field, format, direction: 'descending' };
        }
        if (prev?.direction === 'descending') {
          return { field, format, direction: 'none' };
        }
        return { field, format, direction: 'none' };
      });
    }, []),
  };

  return (
    <Table
      colorScheme="zebra"
      tableWrapperRef={tableWrapperRef}
      tableRef={tableRef}
    >
      <Thead
        viewDataFormatScheme={scheme}
        onSort={callbacks.onSort}
        activeField={sort?.field}
        direction={sort?.direction}
      />
      <Tbody
        items={transactionsByPage}
        viewDataFormatScheme={scheme}
        getExpandedComponent={(info) => <ExpandedContent info={info} />} // @todo
      />
    </Table>
  );
};
