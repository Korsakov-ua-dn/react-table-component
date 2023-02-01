import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAllTransactions, transactionActions } from "../../store/transaction-slice";
import { Transaction } from "../../api";
import { getPageStylesForPrint, sortArrayOfObjects, viewDataScheme } from "./transactions.services";
import ExpandingContent from "../../components/expanding-content";
import TableComponent from "../../components/table-component";
import TableControls from "../../components/table-controls";
import { Direction, FormatData } from "../../components/table-component/types";
// From MUI
import PaginationMUI from "@mui/material/TablePagination";
import { SelectChangeEvent } from "@mui/material/Select";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "../../utils/translate/use-translate";
import { onDownloadXlsx } from "../../utils/on-download-xlsx";

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

  const [search, setSearch] = useState<{field: keyof Transaction, value: string} | null>(null);
  const [sort, setSort] = useState<{ field: keyof Transaction; format: FormatData, direction: Direction} | null>(null);

  // Отфильтрованный массив транзакций по поиску
  const filteredTransactions = useMemo<Transaction[]>(() => {
    if (search) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${search.value}`, "i");
      return select.transactions.filter((item) =>
        regex.test(String(item[search.field]))
      );
      //Поиск чувствительный к регистру
      // return select.transactions.filter((item) =>
      //   String(item[search.field]).includes(search.value)
      // );
    } else return select.transactions;
  }, [search, select.transactions]);

  // Отсортированный массив транзакций
  const sortTransactions = useMemo<Transaction[]>(() => {
    if (sort) {
      return sortArrayOfObjects(filteredTransactions, sort.field, sort.direction, sort.format);
    } else return filteredTransactions;
  }, [filteredTransactions, sort]);

  // Отфильтрованный массив транзакций для рендера постранично
  const transactionsForView = useMemo<Transaction[]>(() => {
    return sortTransactions.filter(
      (_, i) => (
        i < select.limit * (select.page + 1) 
        && i >= select.limit * select.page)
      );
  }, [select.limit, select.page, sortTransactions]);

  const translate = useTranslation("table", select.locale);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
    /** 
   * Строки таблицы разворачиваются по клику и меняют высоту таблицы.
   * Перед выполнением печати необходимо актуализировать высоту таблицы
   * и вмонтировать тег <style> со стилями для печати
  */
  const onPrintPdf = useReactToPrint({
    content: () => tableWrapperRef.current,
    documentTitle: "table",
    onBeforeGetContent: () => {
      if (tableRef.current) {
        const style = document.createElement("style");
        style.textContent = getPageStylesForPrint(
          tableRef.current.offsetWidth,
          tableRef.current.offsetHeight
        );
        tableWrapperRef.current?.appendChild(style); // вмонтирую <style> в DOM перед печатью
      }
    },
    onAfterPrint: () => {
      if (tableWrapperRef.current?.lastChild) {
        tableWrapperRef.current.removeChild(tableWrapperRef.current.lastChild); // удаляю <style> из DOM после печати
      }
    },
    removeAfterPrint: true,
  });
  
  const callbacks = {
    changeRowsPerPage: useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(transactionActions.setLimit(Number(e.target.value)))
    }, [dispatch]),

    changePage: useCallback((e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      dispatch(transactionActions.setPage(newPage))
    }, [dispatch]),

    onSearch: useCallback((value: string) => {
      setSearch(prev => prev ? {...prev, value} : null);
    }, []),

    onSelectSearchField: useCallback((e: SelectChangeEvent) => {
      const field = e.target.value as keyof Transaction;
      setSearch({field, value: ""});
    }, []),

    onSort: useCallback((field: keyof Transaction) => {
      const format = viewDataScheme[field]?.format!;
      setSort(prev => {

        if (prev?.field !== field || prev?.direction === "none") {
          return { field, format, direction: "ascending" }
        }
        if (prev?.direction === "ascending") {
          return { field, format, direction: "descending" }
        }
        if (prev?.direction === "descending") {
          return { field, format, direction: "none" }
        } 
        return { field, format, direction: "none" }
        
      });
    }, []),

    onDownloadXlsx: useCallback(() => {
      onDownloadXlsx(sortTransactions, viewDataScheme);
    }, [sortTransactions]),
  };

  useLayoutEffect(() => {
    dispatch(fetchAllTransactions())
  }, [dispatch]);

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!select.transactions.length && (
        <>
          <TableControls
            viewDataFormatScheme={viewDataScheme}
            search={search} 
            onSearch={callbacks.onSearch}
            onSelectField={callbacks.onSelectSearchField}
            onPrintPdf={onPrintPdf}
            onDownloadXlsx={callbacks.onDownloadXlsx}
            translate={translate}
          />
          <TableComponent
            items={transactionsForView}
            viewDataFormatScheme={viewDataScheme}
            colorScheme="zebra"
            activeField={sort?.field}
            direction={sort?.direction}
            expandingContentComponent={(info) => <ExpandingContent info={info} />}
            tableWrapperRef={tableWrapperRef}
            tableRef={tableRef}
            onSort={callbacks.onSort}
          />
          <PaginationMUI
            component="div"
            count={select.transactions.length}
            page={select.page}
            onPageChange={callbacks.changePage}
            rowsPerPage={select.limit}
            rowsPerPageOptions={[5,10,25]}
            labelRowsPerPage={translate("show")}
            onRowsPerPageChange={callbacks.changeRowsPerPage}
            showFirstButton
            showLastButton
            labelDisplayedRows={(paginationInfo) => (
              `${translate("page")} ${paginationInfo.page + 1} ${translate("of")} ${Math.ceil(paginationInfo.count/select.limit)}`
            )}
          />
        </>
      )}



      {/* {!!select.transactions.length && (
          <TableContainer
            items={select.transactions}
            limit={select.limit}
            page={select.page}
            viewDataFormatScheme={{
              name: { format: "string", title: "Транспорт", sort: true, renderFunction: formatDataToView["string"], width: 200 },
              date: { format: "date", title: "Дата", sort: true, renderFunction: formatDataToView["date"], width: 200 },
              card: { format: "string", title: "Карта", sort: false, renderFunction: formatDataToView["string"], width: 200 },
              point: { format: "string", title: "АЗС", sort: false, renderFunction: formatDataToView["string"], width: 100 },
              address: { format: "string", title: "Адрес", sort: true, renderFunction: formatDataToView["string"], width: 400 },
              fuelName: { format: "string", title: "Тип топлива", sort: false, renderFunction: formatDataToView["string"] },
              fuelCount: { format: "number", title: "Количество", sort: true, renderFunction: formatDataToView["number"] },
              coast: { format: "price", title: "Стоимость", sort: true, renderFunction: formatDataToView["price"] },
            }} // => тут типы проверяются
            // viewDataFormatScheme={viewDataScheme} // Если вынести объект схемы в переменную теряется проверка типизации
            colorScheme="zebra"
            locale={select.locale}
            setLimit={callbacks.setLimit}
            setPage={callbacks.setPage}
            expandingContentComponent={(info) => <ExpandingContent info={info} />}
          />
      )} */}

      
    </>
  );
};

export default React.memo(Transactions) as typeof Transactions;