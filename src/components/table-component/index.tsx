import React, { Ref } from "react";
import Tbody from "./t-body";
import Thead from "./t-head";
import {
  ColorScheme,
  Direction,
  ExpandedContentComponent,
  ViewDataFormatScheme,
} from "./types";
import "./style.scss";

type TableProps<T> = {
  items: T[];
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  colorScheme?: ColorScheme;
  tableRef?: Ref<HTMLTableElement>;
  tableWrapperRef?: Ref<HTMLDivElement>;
  getExpandedContentComponent: ExpandedContentComponent;
  direction?: Direction;
  activeField?: keyof T;
  onSort?: (field: keyof T) => void;
  children: React.ReactElement
};

const TableComponent = <T extends object>(props: TableProps<T>) => {
  const classTable = `
    Table 
    ${props.colorScheme === "zebra" ? "Table_zebra" : ""}
  `;

  return (
    <div className={classTable} ref={props.tableWrapperRef}>
      <table id="table" ref={props.tableRef}>
        {/* <Thead
          viewDataFormatScheme={props.viewDataFormatScheme}
          onSort={props.onSort}
          activeField={props.activeField}
          direction={props.direction}
        />
        <Tbody
          items={props.items}
          viewDataFormatScheme={props.viewDataFormatScheme}
          getExpandedContentComponent={props.getExpandedContentComponent}
        /> */}
        { props.children }
      </table>
    </div>
  );
};

export default React.memo(TableComponent) as typeof TableComponent;
