import React, { useCallback, useLayoutEffect } from "react";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { appActions } from "../../store/app-slice";
import { Locale } from "../../utils/translate/use-translate";

type PropsType = {
  children: React.ReactNode;
};

const MainLayout: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();
  
  const select = useAppSelector((state) => ({
    locale: state.app.locale,
  }));

  const callbacks = {
    changeLocale: useCallback((locale: Locale) => {
      dispatch(appActions.setLocale(locale))
    }, [dispatch]),
  };

  useLayoutEffect(() => {
    dispatch(appActions.remindLocale());
  }, [dispatch])

  return (
    <Layout>
        <Header
          locale={select.locale}
          changeLocale={callbacks.changeLocale} 
        />
        { props.children }
    </Layout>
  );
};

export default React.memo(MainLayout);
