import React, { MouseEvent, Ref } from "react";
import TableBody from "../table-body";
import TableHead from "../table-head";
import { ColorScheme, Direction, ExpandingContentComponent, ViewDataFormatScheme } from "../types";
import "./style.scss";

type PropsType<T> = {
  tableWrapperRef: Ref<HTMLDivElement>;
  tableRef: Ref<HTMLTableElement>;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  items: T[];
  limit: number;
  page: number;
  colorScheme: ColorScheme;
  activeField: keyof T | undefined;
  direction: Direction;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  expandingContentComponent: ExpandingContentComponent;
};

const Table = <T extends object>(props: PropsType<T>) => {
  
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
            limit={props.limit}
            page={props.page}
            viewDataFormatScheme={props.viewDataFormatScheme}
            expandingContentComponent={props.expandingContentComponent}
          />
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table) as typeof Table;