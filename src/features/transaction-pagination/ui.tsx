import { useCallback } from 'react';
import { LabelDisplayedRowsArgs } from '@mui/material/TablePagination/TablePagination';

import { useTranslation } from 'shared/intl';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import TablePaginationMui from 'shared/ui/table-pagination-mui';

import { getSortTransactions } from 'entities/transaction';

import { OPTIONS } from './config';
import { transactionPaginationActions } from './model';

export const TransactionPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    limit: state['transaction-pagination'].limit,
    page: state['transaction-pagination'].page,
  }));

  const sortTransactions = useAppSelector(getSortTransactions);
  const translate = useTranslation('table');

  const cb = {
    changeRowsPerPage: useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(transactionPaginationActions.setLimit(Number(e.target.value)));
      },
      [dispatch]
    ),

    changePage: useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(transactionPaginationActions.setPage(newPage));
      },
      [dispatch]
    ),

    labelDisplayedRows: useCallback(
      (info: LabelDisplayedRowsArgs) =>
        `${translate('page')} ${info.page + 1} 
        ${translate('of')} ${Math.ceil(info.count / select.limit) || 1}`,
      [select.limit, translate]
    ),
  };

  return (
    <TablePaginationMui
      count={sortTransactions.length}
      page={select.page}
      rowsPerPage={select.limit}
      onPageChange={cb.changePage}
      rowsPerPageOptions={OPTIONS}
      labelRowsPerPage={translate('show')}
      onRowsPerPageChange={cb.changeRowsPerPage}
      labelDisplayedRows={cb.labelDisplayedRows}
    />
  );
};
