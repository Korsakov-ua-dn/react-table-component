import React, {
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import { DataFormatScheme } from "../../components/react-table-component/table-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAllTransactions, transactionActions } from "../../store/transaction-slice";
import TableContainer from "../../components/react-table-component";

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

  const options = {
    viewDataFormatScheme: useMemo(
      (): DataFormatScheme => ({
        name: { format: "string", title: "Транспорт", sort: true },
        date: { format: "date", title: "Дата", sort: true },
        card: { format: "string", title: "Карта", sort: false },
        point: { format: "string", title: "АЗС", sort: false },
        address: { format: "string", title: "Адрес", sort: true },
        fuelName: { format: "string", title: "Тип топлива", sort: false },
        fuelCount: {format: "number", title: "Количество", sort: true },
        coast: { format: "price", title: "Стоимость", sort: true },
      }),
      []
    ), // Данная схема исключает отрисовку полей "_id" и "__v"
  };
  
  useLayoutEffect(() => {
    dispatch(fetchAllTransactions())
  }, [dispatch])

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!select.transactions.length && (
          <TableContainer
            items={select.transactions}
            limit={select.limit}
            page={select.page}
            viewDataFormatScheme={options.viewDataFormatScheme}
            colorScheme="zebra"
            locale={select.locale}
            setLimit={callbacks.setLimit}
            setPage={callbacks.setPage}
          />
      )}
    </>
  );
};

export default React.memo(Transactions);
