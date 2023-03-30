import { FC, useLayoutEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { geocode } from 'shared/api';
import { PageLayout } from 'shared/ui/page-layout';
import { fetchAllTransactions } from 'entities/transaction/model/thunks';
import { TransactionPagination } from 'features/transaction-pagination';
import { TransactionTable } from 'features/transaction-table';
import { TransactionControls } from 'widgets/transaction-controls';

const TransactionAnalytics: FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    transactions: state.transaction.data,
    loading: state.transaction.loading,
    error: state.transaction.error,
  }));

  // Два рефа нужны для печати пдф
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useLayoutEffect(() => {
    geocode.init();
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  if (select.loading) {
    return <PageLayout>Загрузка данных о транзакциях...</PageLayout>;
  }

  if (select.error) {
    return <PageLayout>{select.error}</PageLayout>;
  }

  if (!select.transactions.length) {
    return <PageLayout>Список транзакций пуст</PageLayout>;
  }

  return (
    <PageLayout>
      <TransactionControls wrapRef={tableWrapperRef} tableRef={tableRef} />

      <TransactionTable />

      <TransactionPagination />
    </PageLayout>
  );
};

export default TransactionAnalytics;
