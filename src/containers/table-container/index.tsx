import React, {
  useCallback,
  useState,
  useMemo,
  MouseEvent,
  ChangeEvent,
} from "react";
import { DataFormatScheme } from "../../components/table-item";
import Table, { ColorScheme } from "../../components/table";
import { sortArrayOfObjects, FormatData, Direction } from "../../utils/sort-array-of-objects";
import TableControls from "../../components/table-controls";
import { SelectChangeEvent } from '@mui/material/Select';
import TablePagination from "../../components/table-pagination";
import useTranslation from "../../hooks/use-translate";

function TableContainer<T, F extends keyof T>(props: {
  items: T[];
  limit: number;
  page: number;
  viewDataFormatScheme: DataFormatScheme;
  colorScheme: ColorScheme;
  locale: string;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
}) {
  
  const t = useTranslation('table', props.locale);
  // console.log(t("search"));
  
  const [search, setSearch] = useState<{field: F, value: string} | null>(null);
  const [sort, setSort] = useState<{ field: F; format: FormatData, direction: Direction} | null>(null);

  const callbacks = {
    onSort: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const field = e.currentTarget.getAttribute("data-field") as F;
      const format = e.currentTarget.getAttribute("data-format") as FormatData;
      setSort(prev => {

        if (prev?.field !== field) {
          return { field, format, direction: "ascending" }
        }
        if (prev?.direction === "none") {
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

    onSearch: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setSearch(prev => prev ? {...prev, value} : null);
      // setSort(prev => (prev ? { ...prev, search: value } : null))
    }, []),

    onSelectField: useCallback((e: SelectChangeEvent) => {
      const field = e.target.value as F;
      setSearch({field, value: ""});
    }, []),
  };

  // Отфильтрованный массив транзакций для рендера
  const filteredItems = useMemo<T[]>(() => {
    if (search) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${search.value}`, "i");
      return props.items.filter((item) =>
        regex.test(String(item[search.field]))
      );
      // Поиск чувствительный к регистру
      // return props.items.filter((item) =>
      //   String(item[sort.field]).includes(search)
      // );
    } else return props.items;
  }, [search, props.items]);

  // Отсортированный массив транзакций для рендера
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
      />
      <Table
        viewDataFormatScheme={props.viewDataFormatScheme}
        items={sortItems}
        limit={props.limit}
        page={props.page}
        activeField={sort?.field}
        direction={sort?.direction || "none"}
        onSort={callbacks.onSort}
        // clearSearch={callbacks.clearSearch}
        colorScheme="zebra"
      />
      <TablePagination 
        count={props.items.length}
        limit={props.limit}
        page={props.page}
        setLimit={props.setLimit}
        setPage={props.setPage}
      />
    </>
  );
}

export default React.memo(TableContainer);