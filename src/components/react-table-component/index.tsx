import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  MouseEvent,
} from "react";
import { DataFormatScheme, ExpandingContentComponent } from "./table-row";
import Table, { ColorScheme } from "./table";
import { sortArrayOfObjects, FormatData, Direction } from "./utils/sort-array-of-objects";
import TableControls from "./table-controls";
import TablePagination from "./table-pagination";
import useTranslation, { Locale } from "./translate/use-translate";
import { getPageStylesForPrint, usePrintPdf } from "./utils/usePrintPdf";
import { onDownloadXls } from "./utils/on-download-xls";
//From MUI
import { SelectChangeEvent } from '@mui/material/Select';
import { useReactToPrint } from "react-to-print";

function TableContainer<T, F extends keyof T>(props: {
  items: T[];
  limit: number;
  page: number;
  viewDataFormatScheme: DataFormatScheme;
  colorScheme: ColorScheme;
  locale: Locale;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  expandingContentComponent: ExpandingContentComponent;
}) {
  
  const t = useTranslation(props.locale);

  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  // const onPrintPdf = usePrintPdf(
  //   tableWrapperRef.current, 
  //   tableRef.current,
  //   [tableWrapperRef.current, tableRef.current]
  //   );
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
        tableWrapperRef.current.removeChild(tableWrapperRef.current.lastChild);
      }
    }, // удаляю <style> из DOM после печати
    removeAfterPrint: true,
  });

  const [search, setSearch] = useState<{field: F, value: string} | null>(null);
  const [sort, setSort] = useState<{ field: F; format: FormatData, direction: Direction} | null>(null);

  const callbacks = {
    onSort: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const field = e.currentTarget.getAttribute("data-field") as F;
      const format = e.currentTarget.getAttribute("data-format") as FormatData;
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

    onSearch: useCallback((value: string) => {
      setSearch(prev => prev ? {...prev, value} : null);
    }, []),

    onSelectField: useCallback((e: SelectChangeEvent) => {
      const field = e.target.value as F;
      setSearch({field, value: ""});
    }, []),

    onDownloadXls: useCallback(() => {
      onDownloadXls(props.items, props.viewDataFormatScheme);
    }, [props.items, props.viewDataFormatScheme]),
  };

  // Отфильтрованный массив элементов для рендера
  const filteredItems = useMemo<T[]>(() => {
    if (search) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${search.value}`, "i");
      return props.items.filter((item) =>
        regex.test(String(item[search.field]))
      );
      //Поиск чувствительный к регистру
      // return props.items.filter((item) =>
      //   String(item[search.field]).includes(search.value)
      // );
    } else return props.items;
  }, [search, props.items]);

  // Отсортированный массив элементов для рендера
  const sortItems = useMemo<T[]>(() => {
    if (sort) {
      return sortArrayOfObjects(filteredItems, sort.field, sort.direction, sort.format);
    } else return filteredItems;
  }, [filteredItems, sort]);

  return (
    <>
      <TableControls
        viewDataFormatScheme={props.viewDataFormatScheme}
        search={search} 
        onSearch={callbacks.onSearch}
        onSelectField={callbacks.onSelectField}
        onPrintPdf={onPrintPdf}
        onDownloadXls={callbacks.onDownloadXls}
        t={t}
      />
      <Table
        ref={tableWrapperRef}
        tableRef={tableRef}
        viewDataFormatScheme={props.viewDataFormatScheme}
        items={sortItems}
        limit={props.limit}
        page={props.page}
        activeField={sort?.field}
        direction={sort?.direction || "none"}
        onSort={callbacks.onSort}
        expandingContentComponent={props.expandingContentComponent}
        colorScheme="zebra"
      />
      <TablePagination 
        count={props.items.length}
        limit={props.limit}
        page={props.page}
        setLimit={props.setLimit}
        setPage={props.setPage}
        t={t}
      />
    </>
  );
}

export default React.memo(TableContainer);