import React, {
  useCallback,
  useState,
  useMemo,
  MouseEvent,
  ChangeEvent,
} from "react";
import { DataFormatScheme } from "../../components/table-item";
import Table, { ColorScheme } from "../../components/table";
import { sortArrayOfObjects, FormatData } from "../../utils/sort-array-of-objects";
import TableControls from "../../components/table-controls";

function TableContainer<T, F extends keyof T>(props: {
  items: T[];
  colorScheme: ColorScheme;
  viewDataFormatScheme: DataFormatScheme;
}) {
  
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<{ field: F; format: FormatData } | null>(null);

  const callbacks = {
    onSort: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const field = e.currentTarget.getAttribute("data-field") as F;
      const format = e.currentTarget.getAttribute("data-format") as FormatData;
      setSort({ field, format });
    }, []),

    onSearch: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setSearch(value);
    }, []),
  };

  // Отфильтрованный массив транзакций для рендера
  const filteredItems = useMemo<T[]>(() => {
    if (search && sort) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${search}`, "i");
      return props.items.filter((item) =>
        regex.test(String(item[sort.field]))
      );
      // Поиск чувствительный к регистру
      // return props.items.filter((item) =>
      //   String(item[sort.field]).includes(search)
      // );
    } else return props.items;
  }, [search, sort, props.items]);

  // Отсортированный массив транзакций для рендера
  const sortItems = useMemo<T[]>(() => {
    if (sort) {
      return sortArrayOfObjects(filteredItems, sort.field, "ascending", sort.format);
    } else return filteredItems;
  }, [filteredItems, sort]);

  return (
    <>
      <TableControls searchValue={search} onSearch={callbacks.onSearch} />
      <Table
        viewDataFormatScheme={props.viewDataFormatScheme}
        items={sortItems}
        // sort={select.sort}
        onSort={callbacks.onSort}
        // clearSearch={callbacks.clearSearch}
        colorScheme="zebra"
      />
    </>
  );
}

export default React.memo(TableContainer);
