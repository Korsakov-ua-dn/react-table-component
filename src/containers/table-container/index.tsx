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

function TableContainer<T, F extends keyof T>(props: {
  items: T[];
  colorScheme: ColorScheme;
  viewDataFormatScheme: DataFormatScheme;
}) {
  
  // const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<{ field: F; format: FormatData, direction: Direction, search: string} | null>(null);

  const callbacks = {
    onSort: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const field = e.currentTarget.getAttribute("data-field") as F;
      const format = e.currentTarget.getAttribute("data-format") as FormatData;
      setSort(prev => {

        if (prev?.field !== field) {
          return { field, format, direction: "none", search: "" }
        }
        if (prev?.direction === "none") {
          return { field, format, direction: "ascending", search: prev.search }
        }
        if (prev?.direction === "ascending") {
          return { field, format, direction: "descending", search: prev.search }
        }
        if (prev?.direction === "descending") {
          return { field, format, direction: "none", search: prev.search }
        } 
        return { field, format, direction: "none", search: "" }
        
      });
    }, []),

    onSearch: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      // setSearch(value);
      setSort(prev => (prev ? { ...prev, search: value } : null))
    }, []),
  };

  // Отфильтрованный массив транзакций для рендера
  const filteredItems = useMemo<T[]>(() => {
    if (sort?.search) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${sort.search}`, "i");
      return props.items.filter((item) =>
        regex.test(String(item[sort.field]))
      );
      // Поиск чувствительный к регистру
      // return props.items.filter((item) =>
      //   String(item[sort.field]).includes(search)
      // );
    } else return props.items;
  }, [sort?.search, sort?.field, props.items]);

  // Отсортированный массив транзакций для рендера
  const sortItems = useMemo<T[]>(() => {
    if (sort) {
      return sortArrayOfObjects(filteredItems, sort.field, sort.direction, sort.format);
    } else return filteredItems;
  }, [filteredItems, sort]);

  return (
    <>
      <TableControls 
        searchValue={sort?.search ? sort?.search : ""} 
        onSearch={callbacks.onSearch} />
      <Table
        viewDataFormatScheme={props.viewDataFormatScheme}
        items={sortItems}
        activeField={sort?.field}
        direction={sort?.direction || "none"}
        onSort={callbacks.onSort}
        // clearSearch={callbacks.clearSearch}
        colorScheme="zebra"
      />
    </>
  );
}

export default React.memo(TableContainer);
