import React, { useCallback } from "react";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { Locale } from "../../components/react-table-component/translate/use-translate";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { appActions } from "../../store/app-slice";

type PropsType = {
  children: React.ReactElement
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
