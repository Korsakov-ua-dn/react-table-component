import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
} from "react";
import { debounce } from "lodash";
import { useReactToPrint } from "react-to-print";
// Own
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useTranslation } from "../../utils/translate/use-translate";
import { transactionActions } from "../../store/transactions-slice";
import { ITransaction, SearchType, SortType } from "./transactions.types";
import { 
  sortArrayOfObjects,
  getPrintPdfSettings,
  viewDataScheme,
  onDownloadXlsx,
} from "./transactions-utils";
import ExpandedContent from "../../containers/expanded-content";
import { TableComponent, TBody, THead } from "../../components/table-component";
import { TableControls, DownloadPanel, SearchPanel } from "../../components/table-controls";
import Pagination from "../../components/pagination";
// From MUI
import { SelectChangeEvent } from "@mui/material/Select";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    transactions: state.transactions.data,
    limit: state.transactions.limit,
    page: state.transactions.page,
    selected: state.transactions.limit,
    locale: state.app.locale,
  }));

  const [search, setSearch] = useState<SearchType>(null);
  const [sort, setSort] = useState<SortType>(null);

  // Отфильтрованный массив транзакций по поиску
  const filteredTransactions = useMemo<ITransaction[]>(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search?.value, select.transactions]);

  // Отсортированный массив транзакций
  const sortTransactions = useMemo<ITransaction[]>(() => {
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
  const transactionsForView = useMemo<ITransaction[]>(() => {
    return sortTransactions.filter(
      (_, i) =>
        i < select.limit * (select.page + 1) && i >= select.limit * select.page
    );
  }, [select.limit, select.page, sortTransactions]);

  const translate = useTranslation("table", select.locale);

  // Три рефа нужны для печати пдф
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  // Мемоизация динамически генерируемого коллбэка
  const printFuncRef = useRef<() => void>();
  printFuncRef.current = useReactToPrint(
    getPrintPdfSettings(tableWrapperRef, tableRef)
  );

  const callbacks = {
    changeRowsPerPage: useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(transactionActions.setLimit(Number(e.target.value)));
    }, [dispatch]),

    changePage: useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(transactionActions.setPage(newPage));
    }, [dispatch]),

    onSearch: useMemo(() => debounce((value: string) => {
      setSearch((prev) => (prev ? { ...prev, value } : null));
    }, 300), []),

    onSelectSearchField: useCallback((e: SelectChangeEvent) => {
      const field = e.target.value as keyof ITransaction;
      setSearch({ field, value: "" });
    }, []),

    onSort: useCallback((field: keyof ITransaction) => {
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

    memoizedPrintPdf: useCallback(() => {
      printFuncRef.current && printFuncRef.current();
    }, []),
  };

  return (
    <>
      <TableControls>
          <DownloadPanel 
            onPrintPdf={callbacks.memoizedPrintPdf} 
            onDownloadXlsx={callbacks.onDownloadXlsx}
          />
          <SearchPanel
            viewDataFormatScheme={viewDataScheme}
            searchField={search?.field}
            onSearch={callbacks.onSearch}
            onSelectField={callbacks.onSelectSearchField}
            translate={translate}
          />
      </TableControls>
      
      <TableComponent
        colorScheme="zebra"
        tableWrapperRef={tableWrapperRef}
        tableRef={tableRef}
      >
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
      </TableComponent>

      <Pagination
        count={sortTransactions.length}
        page={select.page}
        rowsPerPage={select.limit}
        onPageChange={callbacks.changePage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage={translate("show")}
        onRowsPerPageChange={callbacks.changeRowsPerPage}
        labelDisplayedRows={(info) =>
          `${translate("page")} ${info.page + 1} 
            ${translate("of")} ${Math.ceil(info.count / select.limit) || 1}`
        }
      />
    </>
  );
};

export default React.memo(Transactions) as typeof Transactions;