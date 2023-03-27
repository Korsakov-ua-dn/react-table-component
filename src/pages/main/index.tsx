import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { geocode } from 'shared/api';

import { MainLayout } from '../../components/main-layout';
import { Transactions, fetchAllTransactions } from '../../modules/transactions';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    transactions: state.transactions.data,
    loading: state.transactions.loading,
    error: state.transactions.error,
  }));

  useLayoutEffect(() => {
    geocode.init();
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  return (
    <MainLayout>
      {select.loading && 'Загрузка данных о транзакциях...'}

      {select.error && select.error}

      {!!select.transactions.length && <Transactions />}
    </MainLayout>
  );
};

export default Main;
