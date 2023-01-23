import React, {
  useCallback,
  useLayoutEffect,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAllTransactions, transactionActions } from "../../store/transaction-slice";
import TableContainer from "../../components/react-table-component";
import ExpandingContent from "../../components/expanding-content";
import { formatDataToView, viewDataScheme } from "./view-data-scheme";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const select = useAppSelector((state) => ({
    transactions: state.transactions.data,
    limit: state.transactions.limit,
    page: state.transactions.page,
    selected: state.transactions.limit,
    loading: state.transactions.loading,
    error: state.transactions.error,
    locale: state.app.locale,
  }));

  const callbacks = {
    setLimit: useCallback((limit: number) => {
      dispatch(transactionActions.setLimit(limit))
    }, [dispatch]),
    setPage: useCallback((page: number) => {
      dispatch(transactionActions.setPage(page))
    }, [dispatch]),
  };
  
  useLayoutEffect(() => {
    dispatch(fetchAllTransactions())
  }, [dispatch]);

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!select.transactions.length && (
          <TableContainer
            items={select.transactions}
            limit={select.limit}
            page={select.page}
            viewDataFormatScheme={{
              name: { format: "string", title: "Транспорт", sort: true, renderFunction: formatDataToView["string"] },
              date: { format: "date", title: "Дата", sort: true, renderFunction: formatDataToView["date"] },
              card: { format: "string", title: "Карта", sort: false, renderFunction: formatDataToView["string"] },
              point: { format: "string", title: "АЗС", sort: false, renderFunction: formatDataToView["string"] },
              address: { format: "string", title: "Адрес", sort: true, renderFunction: formatDataToView["string"] },
              fuelName: { format: "string", title: "Тип топлива", sort: false, renderFunction: formatDataToView["string"] },
              fuelCount: { format: "number", title: "Количество", sort: true, renderFunction: formatDataToView["number"] },
              coast: { format: "price", title: "Стоимость", sort: true, renderFunction: formatDataToView["price"]},
            }} // Если вынести объект схемы теряется проверка типизации
            colorScheme="zebra"
            locale={select.locale}
            setLimit={callbacks.setLimit}
            setPage={callbacks.setPage}
            expandingContentComponent={(info) => <ExpandingContent info={info} />}
          />
      )}
    </>
  );
};

export default React.memo(Transactions) as typeof Transactions;