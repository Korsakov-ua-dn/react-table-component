import React, { Ref } from "react";
import Table from "./table";
import {
  ColorScheme,
  Direction,
  ExpandingContentComponent,
  ViewDataFormatScheme,
} from "./types";

type TableProps<T> = {
  items: T[];
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  colorScheme: ColorScheme;
  tableRef?: Ref<HTMLTableElement>;
  tableWrapperRef?: Ref<HTMLDivElement>;
  expandingContentComponent: ExpandingContentComponent;
  sortDirection?: Direction;
  activeField?: keyof T;
  onSort?: (field: keyof T) => void;
};

const TableComponent = <T extends object, F extends keyof T>(props: TableProps<T>): JSX.Element => {
  const callbacks = {
    onSort: props.onSort,
  };

  return (
    <Table
      tableWrapperRef={props.tableWrapperRef}
      tableRef={props.tableRef}
      viewDataFormatScheme={props.viewDataFormatScheme}
      items={props.items}
      activeField={props.activeField}
      direction={props.sortDirection || "none"}
      onSort={callbacks.onSort || null}
      expandingContentComponent={props.expandingContentComponent}
      colorScheme={props.colorScheme || "mono"}
    />
  );
};

export default React.memo(TableComponent) as typeof TableComponent;
