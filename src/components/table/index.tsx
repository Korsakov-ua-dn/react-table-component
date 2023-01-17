import React, { MouseEvent } from "react";
import { Direction } from "../../utils/sort-array-of-objects";
import TableHeader from "../table-header";
import TabelItem, { DataFormatScheme } from "../table-item";
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
  
  const tbody = props.items.map((item, i) => {
    if ( 
      i < props.limit * (props.page + 1) &&
      i >= props.limit * props.page
    ) {
      return (
        <TabelItem
          key={item._id}
          data={item}
          viewDataFormatScheme={props.viewDataFormatScheme}
        />
      )
    } else return false
  })

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
          { tbody }
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);

//types
export type ColorScheme = "mono" | "zebra";
