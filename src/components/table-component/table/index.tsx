import React, { RefObject } from "react";
import { ColorSchemeType } from "../table.types";
import "./style.scss";

type TableProps = {
  colorScheme?: ColorSchemeType;
  tableRef?: RefObject<HTMLTableElement>;
  tableWrapperRef?: RefObject<HTMLDivElement>;
  children: React.ReactElement;
};

const TableComponent:React.FC<TableProps> = (props) => {
  const classTable = `
    Table 
    ${props.colorScheme === "zebra" ? "Table_zebra" : ""}
  `;

  return (
    <div className={classTable} ref={props.tableWrapperRef}>
      <table id="table" ref={props.tableRef}>
        {props.children}
      </table>
    </div>
  );
};

export default React.memo(TableComponent) as typeof TableComponent;
