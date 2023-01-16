import React, {
  useMemo,
} from "react";
import { DataFormatScheme } from "../../components/table-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
// import { transactionActions, Sort } from "../../store/transaction-slice";
import TableContainer from "../table-container";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    transactions: state.transactions.data,
    sort: state.transactions.sort,
    selected: state.transactions.limit,
    loading: state.transactions.loading,
    error: state.transactions.error,
  }));

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

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!select.transactions.length && (
          <TableContainer
            items={select.transactions}
            colorScheme="zebra"
            viewDataFormatScheme={options.viewDataFormatScheme}
          />
      )}
    </>
  );
};

export default React.memo(Transactions);
