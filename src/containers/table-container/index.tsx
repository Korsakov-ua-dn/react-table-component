import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
  MouseEvent,
  ChangeEvent,
} from "react";
import { Transaction } from "../../api";
import TabelItem from "../../components/table-item";
import Table from "../../components/table";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { transactionActions, Sort } from "../../store/transaction-slice";
import { sortByKey } from "../../utils/sort-by-key";

const TableContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    transactions: state.transactions.data,
    sort: state.transactions.sort,
    selected: state.transactions.limit,
    loading: state.transactions.loading,
    error: state.transactions.error,
  }));

  const tableRef = useRef<HTMLTableElement>(null);

  const renders = {
    transaction: useCallback((transaction: Transaction) => {
      // "_id" и "__v" не нужно рендерить в таблице
      const data: Partial<Transaction> = { ...transaction };
      delete data._id;
      delete data.__v;
      return (
        <TabelItem
          key={transaction._id}
          data={data}
          className="Transaction"
          dateFormatScheme={{
            name: "string",
            date: "date",
            card: "string",
            point: "string",
            address: "string",
            fuelName: "string",
            fuelCount: "number",
            coast: "price",
          }}
        />
      );
    }, []),
  };

  const options = {
    tableHeader: useMemo(
      () => [
        {title: "Транспорт", sort: true},
        {title: "Дата", sort: true},
        {title: "Карта", sort: false},
        {title: "АЗС", sort: false},
        {title: "Адрес", sort: true},
        {title: "Тип топлива", sort: false},
        {title: "Количество", sort: true},
        {title: "Стоимость", sort: true},
      ],
      []
    ),
  };

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!select.transactions.length && (
        <Table
          headerOptions={options.tableHeader}
          items={select.transactions}
          // sort={select.sort}
          // search={search}
          renderItem={renders.transaction}
          // onSort={callbacks.onSort}
          // onSearch={callbacks.onSearch}
          // clearSearch={callbacks.clearSearch}
          // onSelectAll={callbacks.onSelectAll}
          colorScheme="zebra"
          ref={tableRef}
        />
      )}
    </>
  );
};

export default React.memo(TableContainer);
