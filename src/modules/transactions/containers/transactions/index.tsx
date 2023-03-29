import React, { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { Table, Tbody, Thead } from 'shared/ui/table-with-expanded-row';
import { useAppSelector } from 'shared/hooks';

import { getTransactionsByPage } from 'modules/transactions/transactions-slice/selectors';

import { SearchPanel } from 'features/searchTransaction/ui';
import { TransactionPagination } from 'features/transaction-pagination';

import ExpandedContent from '../../../../containers/expanded-content';

import {
  getPrintPdfSettings,
  onDownloadXlsx,
  viewDataScheme,
} from '../../transactions-utils';
import { ITransaction, SortType } from '../../types';
import TableControls from '../../components/table-controls/table-controls';
import DownloadPanel from '../../components/table-controls/download-panel';

export const Transactions: React.FC = () => {
  const transactionsByPage = useAppSelector(getTransactionsByPage);

  const [sort, setSort] = useState<SortType>(null);

  // Три рефа нужны для печати пдф
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  // Мемоизация динамически генерируемого коллбэка
  const printFuncRef = useRef<() => void>();
  printFuncRef.current = useReactToPrint(
    getPrintPdfSettings(tableWrapperRef, tableRef)
  );

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

    onDownloadXlsx: useCallback(() => {
      onDownloadXlsx(transactionsByPage, viewDataScheme);
    }, [transactionsByPage]),

    memoizedPrintPdf: useCallback(() => {
      printFuncRef.current && printFuncRef.current();
    }, []),
  };

  return (
    <>
      <TableControls>
        <DownloadPanel
          onPrintPdf={callbacks.memoizedPrintPdf}
          onDownloadXlsx={callbacks.onDownloadXlsx}
        />
        <SearchPanel viewDataFormatScheme={viewDataScheme} />
      </TableControls>

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
