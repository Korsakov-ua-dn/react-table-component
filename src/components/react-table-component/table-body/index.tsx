import React from "react";
import { ViewDataFormatScheme } from "..";
import  TabelRow, { ExpandingContentComponent } from "../table-row";
import "./style.scss";

type PropsType<T> = {
  items: T[];
  limit: number;
  page: number;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  expandingContentComponent: ExpandingContentComponent;
};

const TableBody = <T,>(props: PropsType<T>): JSX.Element => {
  const tbody = props.items.map((row, i) => {
    if ( 
      i < props.limit * (props.page + 1) &&
      i >= props.limit * props.page
    ) {
      return (
        <TabelRow
          //@ts-ignore 
          key={row._id}
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