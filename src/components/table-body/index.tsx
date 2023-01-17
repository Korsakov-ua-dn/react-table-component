import React from "react";
import  TabelItem, { DataFormatScheme } from "../table-item";
import "./style.scss";

type PropsType = {
  items: any[];
  limit: number;
  page: number;
  viewDataFormatScheme: DataFormatScheme;
};

const TableBody: React.FC<PropsType> = (props) => {
  const tbody = props.items.map((item, i) => {
    if ( 
      i < props.limit * (props.page + 1) &&
      i >= props.limit * props.page
    ) {
      return (
        <TabelItem
          key={item._id}
          data={item}
          painted={i % 2 === 0}
          viewDataFormatScheme={props.viewDataFormatScheme}
        />
      )
    } else return false
  })


  return <>{tbody}</>;
};

export default React.memo(TableBody);