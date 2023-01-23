import React, { MouseEvent, Ref } from "react";
import { Direction } from "../utils/sort-array-of-objects";
import TableBody from "../table-body";
import TabelHead from "../table-head";
import { ExpandingContentComponent } from "../table-row";
import "./style.scss";
import { ViewDataFormatScheme } from "..";

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
          <TabelHead
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

//types
export type ColorScheme = "mono" | "zebra";
