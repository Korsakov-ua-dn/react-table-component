import React, { useCallback, useRef, useState } from 'react';

import { Table, Tbody, Thead } from 'shared/ui/table-with-expanded-row';
import { useAppSelector } from 'shared/hooks';

import { getTransactionsByPage } from 'modules/transactions/transactions-slice/selectors';

import { TransactionPagination } from 'features/transaction-pagination';

import { TransactionControls } from 'widgets/transaction-controls';

import ExpandedContent from '../../../../containers/expanded-content';

import { viewDataScheme } from '../../transactions-utils';
import { ITransaction, SortType } from '../../types';

export const Transactions: React.FC = () => {
  const transactionsByPage = useAppSelector(getTransactionsByPage);

  const [sort, setSort] = useState<SortType>(null);

  // Три рефа нужны для печати пдф
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const callbacks = {
    onSort: useCallback((field: keyof ITransaction) => {
      const format = viewDataScheme[field]?.format!;
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
    <>
      <TransactionControls wrapRef={tableWrapperRef} tableRef={tableRef} />

      <Table
        colorScheme="zebra"
        tableWrapperRef={tableWrapperRef}
        tableRef={tableRef}
      >
        <Thead
          viewDataFormatScheme={viewDataScheme}
          onSort={callbacks.onSort}
          activeField={sort?.field}
          direction={sort?.direction}
        />
        <Tbody
          items={transactionsByPage}
          viewDataFormatScheme={viewDataScheme}
          getExpandedComponent={(info) => <ExpandedContent info={info} />}
        />
      </Table>

      <TransactionPagination />
    </>
  );
};
