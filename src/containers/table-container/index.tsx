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
import TableControls from "../../components/table-controls";

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
  const [search, setSearch] = useState<Search>(null);

  const callbacks = {

    // onSort: useCallback((e: MouseEvent<HTMLSpanElement>) => {
    //   const searchParam = (e.currentTarget.getAttribute('data-key')) as SortType;
    //   dispatch(articlesActions.setSort(searchParam))
    // }, [dispatch]),

    onSearch: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const string = e.currentTarget.value
      const field = e.currentTarget.getAttribute('data-field') as OptionsType
      field && setSearch({ string, field })
    }, []),

    // clearSearch: useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //   const field = e.currentTarget.getAttribute('data-field') as OptionsType
    //   if (search?.field !== field) {
    //     setSearch(null)
    //   }
    // }, [search?.field]),

    // onResize: useCallback(() => {
    //   if (tableRef.current) {
    //     let maxHeight = window.innerHeight - tableRef.current.offsetTop * 2
    //     tableRef.current.style.maxHeight = `${maxHeight}px`;
    //   }
    // }, [])
  
  };

  // Отфильтрованный массив транзакций для рендера
  const filteredTransactions = useMemo<Transaction[]>(() => {
    if (search) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${search.string}`, 'i' )
      return select.transactions.filter(item => regex.test(String(item[search.field])))
      // Поиск чувствительный к регистру
      // return select.articles.filter(item => String(item[search.field]).includes(search.string))
    } else return select.transactions
  }, [search, select.transactions])

  // Отсортированный массив транзакций для рендера
  // const sortTransactions = useMemo<Transaction[]>(() => {
  //   return sortByKey(select.transactions, select.sort)
  // }, [select.sort, select.transactions])

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
        <>
          <TableControls />
          <Table
            headerOptions={options.tableHeader}
            items={filteredTransactions}
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
        </>
      )}
    </>
  );
};

export default React.memo(TableContainer);

// types
type OptionsType = keyof Transaction

export type Search = { 
  string: string, 
  field: OptionsType
} | null
