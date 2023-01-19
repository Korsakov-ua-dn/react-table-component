import React, { MouseEvent, ForwardedRef } from "react";
import { Direction } from "../utils/sort-array-of-objects";
import TableBody from "../table-body";
import TabelHead from "../table-head";
import { DataFormatScheme, ExpandingContentComponent } from "../table-row";
import "./style.scss";

type PropsType = {
  tableRef: ForwardedRef<HTMLTableElement | null>;
  viewDataFormatScheme: DataFormatScheme;
  items: any[];
  limit: number;
  page: number;
  colorScheme: ColorScheme;
  activeField: any;
  direction: Direction;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  expandingContentComponent: ExpandingContentComponent;
};

const Table = React.forwardRef((props: PropsType, ref: ForwardedRef<HTMLDivElement  | null>) => {
  
  const classTable = `Table ${props.colorScheme === "zebra" ? "Table_zebra" : ""}`;

  return (
    <div className={classTable} ref={ref}>
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
});

export default React.memo(Table);

//types
export type ColorScheme = "mono" | "zebra";
