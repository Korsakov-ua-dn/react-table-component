import { memo, useCallback } from 'react';

import { Table, Tbody, Thead } from 'shared/ui/table-with-expanded-row';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { ITransaction } from 'shared/api';
import { getTransactionsByPage, scheme } from 'entities/transaction';

import { transactionSortActions } from '../model';
import { getSortParams } from '../lib';

import { TransactionMap } from './transaction-map';

interface IProps {
  wrapRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLTableElement>;
}

export const TransactionTable: React.FC<IProps> = memo(
  ({ wrapRef, tableRef }) => {
    const dispatch = useAppDispatch();
    const transactionsByPage = useAppSelector(getTransactionsByPage);
    const params = useAppSelector((state) => state['transaction-sort'].params);

    const cb = {
      onSort: useCallback(
        (field: keyof ITransaction) => {
          const format = scheme[field]?.format;
          if (format) {
            const newParams = getSortParams(params, field, format);
            dispatch(transactionSortActions.setParams(newParams));
          }
        },
        [dispatch, params]
      ),

      getExpandedComponent: useCallback(
        (info: ITransaction) => <TransactionMap info={info} />,
        []
      ),
    };

    return (
      <Table colorScheme="zebra" wrapRef={wrapRef} tableRef={tableRef}>
        <Thead
          scheme={scheme}
          onSort={cb.onSort}
          activeField={params?.field}
          direction={params?.direction}
        />
        <Tbody
          items={transactionsByPage}
          scheme={scheme}
          getExpandedComponent={cb.getExpandedComponent}
        />
      </Table>
    );
  }
);
