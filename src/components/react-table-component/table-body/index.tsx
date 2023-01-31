import React from "react";
import  TabelRow from "../table-row";
import { v1 } from 'uuid';
import "./style.scss";
import { ExpandingContentComponent, ViewDataFormatScheme } from "../types";

type PropsType<T> = {
  items: T[];
  limit: number;
  page: number;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  expandingContentComponent: ExpandingContentComponent;
};

const TableBody = <T extends object>(props: PropsType<T>): JSX.Element => {
  const tbody = props.items.map((row, i) => {
    if ( 
      i < props.limit * (props.page + 1) &&
      i >= props.limit * props.page
    ) {
      const id = v1();
      return (
        <TabelRow
          key={id}
          row={row}
          painted={i % 2 === 0} // покрасить зеброй
          viewDataFormatScheme={props.viewDataFormatScheme}
          expandingContentComponent={props.expandingContentComponent}
        />
      )
    } else return false
  })

  return <>{tbody}</>;
};

export default React.memo(TableBody) as typeof TableBody;