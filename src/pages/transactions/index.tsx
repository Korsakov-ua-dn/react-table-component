import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAllTransactions, transactionActions } from "../../store/transaction-slice";
import { Transaction } from "../../api/api.types";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "../../utils/translate/use-translate";
import { onDownloadXlsx } from "../../utils/on-download-xlsx";
import {
  getPageStylesForPrint,
  sortArrayOfObjects,
  viewDataScheme,
} from "./transactions.services";
import { Search, Sort } from "./transactions.types";
import ExpandedContent from "../../components/expanded-content";
import TableComponent from "../../components/table-component";
import TBody from "../../components/table-component/t-body";
import THead from "../../components/table-component/t-head";
import TableControls from "../../components/table-controls";
// From MUI
import TablePagination from "@mui/material/TablePagination";
import { SelectChangeEvent } from "@mui/material/Select";
import Download from "../../components/table-controls/download";
import SearchPanel from "../../components/table-controls/search-panel";

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

  const [search, setSearch] = useState<Search>(null);
  const [sort, setSort] = useState<Sort>(null);

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
      return sortArrayOfObjects(
        filteredTransactions,
        sort.field,
        sort.direction,
        sort.format
      );
    } else return filteredTransactions;
  }, [filteredTransactions, sort]);

  // Отфильтрованный массив транзакций для рендера постранично
  const transactionsForView = useMemo<Transaction[]>(() => {
    return sortTransactions.filter(
      (_, i) =>
        i < select.limit * (select.page + 1) && i >= select.limit * select.page
    );
  }, [select.limit, select.page, sortTransactions]);

  const translate = useTranslation("table", select.locale);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null); // оба рефа нужны для печати пдф
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
    changeRowsPerPage: useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(transactionActions.setLimit(Number(e.target.value)));
    }, [dispatch]),

    changePage: useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(transactionActions.setPage(newPage));
    }, [dispatch]),

    onSearch: useCallback((value: string) => {
      setSearch((prev) => (prev ? { ...prev, value } : null));
    }, []),

    onSelectSearchField: useCallback((e: SelectChangeEvent) => {
      const field = e.target.value as keyof Transaction;
      setSearch({ field, value: "" });
    }, []),

    onSort: useCallback((field: keyof Transaction) => {
      const format = viewDataScheme[field]?.format!;
      setSort((prev) => {
        if (prev?.field !== field || prev?.direction === "none") {
          return { field, format, direction: "ascending" };
        }
        if (prev?.direction === "ascending") {
          return { field, format, direction: "descending" };
        }
        if (prev?.direction === "descending") {
          return { field, format, direction: "none" };
        }
        return { field, format, direction: "none" };
      });
    }, []),

    onDownloadXlsx: useCallback(() => {
      onDownloadXlsx(transactionsForView, viewDataScheme);
    }, [transactionsForView]),
  };

  useLayoutEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {select.error && select.error}

      {!!select.transactions.length && (
        <>
          <TableControls>
            <>
              <Download 
                onPrintPdf={onPrintPdf} 
                onDownloadXlsx={callbacks.onDownloadXlsx}
              />
              <SearchPanel
                viewDataFormatScheme={viewDataScheme}
                search={search}
                onSearch={callbacks.onSearch}
                onSelectField={callbacks.onSelectSearchField}
                translate={translate}
              />
            </>
          </TableControls>
          
          <TableComponent
            colorScheme="zebra"
            tableWrapperRef={tableWrapperRef}
            tableRef={tableRef}
          >
            <>
              <THead
                viewDataFormatScheme={viewDataScheme}
                onSort={callbacks.onSort}
                activeField={sort?.field}
                direction={sort?.direction}
              />
              <TBody
                items={transactionsForView}
                viewDataFormatScheme={viewDataScheme}
                getExpandedContentComponent={(info) => (
                  <ExpandedContent info={info} />
                )}
              />
            </>
          </TableComponent>

          <TablePagination
            component="div"
            count={sortTransactions.length}
            page={select.page}
            onPageChange={callbacks.changePage}
            rowsPerPage={select.limit}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage={translate("show")}
            onRowsPerPageChange={callbacks.changeRowsPerPage}
            showFirstButton
            showLastButton
            labelDisplayedRows={(info) =>
              `${translate("page")} ${info.page + 1} 
               ${translate("of")} ${Math.ceil(info.count / select.limit) || 1}`
            }
            SelectProps={{
              MenuProps: {
                sx: {
                  '.MuiTablePagination-menuItem.Mui-selected': {
                    backgroundColor: 'var(--color-active)!important',
                    color: '#ffffff',
                  },
                },
              },
            }}
          />
          
        </>
      )}
    </>
  );
};

export default React.memo(Transactions) as typeof Transactions;