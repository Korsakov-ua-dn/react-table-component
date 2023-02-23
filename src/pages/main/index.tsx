import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Transactions from '../../modules/transactions';
import { geocode } from '../../services/geocode-services';
import { fetchAllTransactions } from '../../store/transactions-slice';

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

  const a = 1;

  console.log(a);

  const b = `sdddddddddd ${a} ddddddddddddddddddddddddd dddddddddddddddddddd dddddddddddddd ddddddddddd вавававава ва ва в авававававававва`;

  const obj = {
    a: 'a',
    b: 'b',
  };

  return (
    <>
      {select.loading && 'Загрузка информации...'}

      {select.error && select.error}

      {!!select.transactions.length && <Transactions />}
    </>
  );
};

export default React.memo(Main) as typeof Main;
