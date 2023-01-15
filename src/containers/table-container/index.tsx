import React, {
  useCallback,
  useState,
  useMemo,
  MouseEvent,
  ChangeEvent,
} from "react";
import TabelItem, { DataFormatScheme } from "../../components/table-item";
import Table, { ColorScheme } from "../../components/table";
import { sortArrayOfObjects, FormatData } from "../../utils/sort-array-of-objects";
import TableControls from "../../components/table-controls";

function TableContainer<T, F extends keyof T>(props: {
  items: T[];
  headerOptions: {
    field: F;
    format: FormatData;
    title: string;
    sort: boolean;
  }[];
  colorScheme: ColorScheme;
  viewDataFormatScheme: DataFormatScheme;
}) {
  
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<{ field: F; format: FormatData }>({
    field: props.headerOptions[0].field,
    format: props.headerOptions[0].format,
  });

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
    if (search) {
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
  }, [search, props.items, sort?.field]);

  // Отсортированный массив транзакций для рендера
  const sortItems = useMemo<T[]>(() => {
    return sortArrayOfObjects(filteredItems, sort.field, "ascending", sort.format);
  }, [filteredItems, sort.field, sort.format]);

  const renders = {
    items: useCallback((item: any) => {
      return (
        <TabelItem
          key={item._id}
          data={item}
          className="Transaction"
          viewDataFormatScheme={props.viewDataFormatScheme}
        />
      );
    }, [props.viewDataFormatScheme]),
  };

  return (
    <>
      <TableControls searchValue={search} onSearch={callbacks.onSearch} />
      <Table
        headerOptions={props.headerOptions}
        items={sortItems}
        // sort={select.sort}
        renderItem={renders.items}
        onSort={callbacks.onSort}
        // clearSearch={callbacks.clearSearch}
        colorScheme="zebra"
      />
    </>
  );
}

export default React.memo(TableContainer);
