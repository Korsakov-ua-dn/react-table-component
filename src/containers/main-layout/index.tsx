import React, { useCallback, useLayoutEffect } from 'react';

import { SelectChangeEvent } from '@mui/material';

import Header from '../../components/header';
import Layout from '../../components/layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { appActions } from '../../store/app-slice';
import { Locale } from '../../utils/translate/use-translate';

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    locale: state.app.locale,
  }));

  const callbacks = {
    changeLocale: useCallback(
      (event: SelectChangeEvent) => {
        dispatch(appActions.setLocale(event.target.value as Locale));
      },
      [dispatch]
    ),
  };

  useLayoutEffect(() => {
    dispatch(appActions.remindLocale());
  }, [dispatch]);

  return (
    <Layout>
      <Header locale={select.locale} changeLocale={callbacks.changeLocale} />
      {props.children}
    </Layout>
  );
};

export default React.memo(MainLayout);
