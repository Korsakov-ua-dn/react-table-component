import React, { MouseEvent } from "react";
import { Direction } from "../../utils/sort-array-of-objects";
import { DataFormatScheme } from "../table-item";
import "./style.scss";

type PropsType = {
  viewDataFormatScheme: DataFormatScheme;
  activeField: any;
  direction: Direction;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
};

const TabelHeader: React.FC<PropsType> = (props) => {
  const arrow = require("../../assets/images/arrow-sort.svg").default;

  let th = [];

  for (let key in props.viewDataFormatScheme) {
    const isSort = props.viewDataFormatScheme[key].sort;
    
    th.push(
      <th
        key={key}
        onClick={isSort ? props.onSort : ()=>{}}
        data-field={key}
        data-format={props.viewDataFormatScheme[key].format}
        className={
          `Table__header-item ${props.activeField === key ? "Table__header-item_active" : ""}`
        }
      >
        <div>
          <img className="Direction-arrow" data-direction={props.direction} src={arrow} alt="sort" />
          {props.viewDataFormatScheme[key].title}
        </div>
      </th>
    );
  }

  return <tr>{th}</tr>;
};

export default React.memo(TabelHeader);