import React, { MouseEvent } from "react";
import TableHeader from "../table-header";
import TabelItem, { DataFormatScheme } from "../table-item";
import "./style.scss";

type PropsType = {
  viewDataFormatScheme: DataFormatScheme;
  items: any[];
  colorScheme: ColorScheme;
  // sort: SortType;
  // search: SearchType;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  // onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // clearSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Table: React.FC<PropsType> = (props) => {
  const classN = `Table ${props.colorScheme === "zebra" ? "Table_zebra" : ""}`;

  return (
    <div className={classN}>
      <table id="table">
        <thead>
          <TableHeader
            viewDataFormatScheme={props.viewDataFormatScheme}
            onSort={props.onSort}
          />
        </thead>
        <tbody>
          {props.items.map((item) => (
            <TabelItem
              key={item._id}
              data={item}
              className="Transaction"
              viewDataFormatScheme={props.viewDataFormatScheme}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);

//types
export type ColorScheme = "mono" | "zebra";
