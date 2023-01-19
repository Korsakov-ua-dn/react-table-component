import React from "react";
import  TabelRow, { DataFormatScheme, ExpandingContentComponent } from "../table-row";
import "./style.scss";

type PropsType = {
  items: any[];
  limit: number;
  page: number;
  viewDataFormatScheme: DataFormatScheme;
  expandingContentComponent: ExpandingContentComponent;
};

const TableBody: React.FC<PropsType> = (props) => {
  const tbody = props.items.map((row, i) => {
    if ( 
      i < props.limit * (props.page + 1) &&
      i >= props.limit * props.page
    ) {
      return (
        <TabelRow
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

export default React.memo(TableBody);