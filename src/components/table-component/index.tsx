import React, { Ref } from "react";
import TableBody from "./table-body";
import TableHead from "./table-head";
import {
  ColorScheme,
  Direction,
  ExpandingContentComponent,
  ViewDataFormatScheme,
} from "./types";
import "./style.scss";

type TableProps<T> = {
  items: T[];
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  colorScheme?: ColorScheme;
  tableRef?: Ref<HTMLTableElement>;
  tableWrapperRef?: Ref<HTMLDivElement>;
  expandingContentComponent: ExpandingContentComponent;
  direction?: Direction;
  activeField?: keyof T;
  onSort?: (field: keyof T) => void;
};

const TableComponent = <T extends object>(props: TableProps<T>): JSX.Element => {
  const classTable = `Table ${props.colorScheme === "zebra" ? "Table_zebra" : ""}`;

  return (
    <div className={classTable} ref={props.tableWrapperRef}>
      <table id="table" ref={props.tableRef}>
        <thead>
          <TableHead
            viewDataFormatScheme={props.viewDataFormatScheme}
            onSort={props.onSort}
            activeField={props.activeField}
            direction={props.direction}
          />
        </thead>
        <tbody>
          <TableBody
            items={props.items}
            viewDataFormatScheme={props.viewDataFormatScheme}
            expandingContentComponent={props.expandingContentComponent}
          />
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TableComponent) as typeof TableComponent;
