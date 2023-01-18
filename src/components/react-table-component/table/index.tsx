import React, { MouseEvent } from "react";
import { Direction } from "../utils/sort-array-of-objects";
import TableBody from "../table-body";
import TableHeader from "../table-header";
import { DataFormatScheme } from "../table-item";
import "./style.scss";

type PropsType = {
  viewDataFormatScheme: DataFormatScheme;
  items: any[];
  limit: number;
  page: number;
  colorScheme: ColorScheme;
  activeField: any;
  direction: Direction;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
};

const Table: React.FC<PropsType> = (props) => {
  const classTable = `Table ${props.colorScheme === "zebra" ? "Table_zebra" : ""}`;

  return (
    <div className={classTable}>
      <table id="table">
        <thead>
          <TableHeader
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
          />
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);

//types
export type ColorScheme = "mono" | "zebra";
