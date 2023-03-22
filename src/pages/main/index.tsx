import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { geocode } from '../../services/geocode-services';
import { MainLayout } from '../../components/main-layout';
import { Transactions, fetchAllTransactions } from '../../modules/transactions';

export const Main: React.FC = () => {
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
      {select.loading && 'Загрузка информации...'}

      {select.error && select.error}

      {!!select.transactions.length && <Transactions />}
    </MainLayout>
  );
};
