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
    tableHeader: useMemo(
      () => [
        { field: "name", format: "string", title: "Транспорт", sort: true },
        { field: "date", format: "date", title: "Дата", sort: true },
        { field: "card", format: "number", title: "Карта", sort: false },
        { field: "point", format: "string", title: "АЗС", sort: false },
        { field: "address", format: "string", title: "Адрес", sort: true },
        { field: "fuelName", format: "string", title: "Тип топлива", sort: false },
        { field: "fuelCount", format: "number", title: "Количество", sort: true },
        { field: "coast", format: "number", title: "Стоимость", sort: true },
      ] as any[],
      []
    ),

    viewDataFormatScheme: useMemo(
      () => ({
        name: "string",
        date: "date",
        card: "string",
        point: "string",
        address: "string",
        fuelName: "string",
        fuelCount: "number",
        coast: "price",
      }) as DataFormatScheme,
      []
    ), // Исключает отрисовку полей "_id" и "__v"
  };

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!select.transactions.length && (
          <TableContainer
            headerOptions={options.tableHeader}
            items={select.transactions}
            colorScheme="zebra"
            viewDataFormatScheme={options.viewDataFormatScheme}
          />
      )}
    </>
  );
};

export default React.memo(Transactions);
