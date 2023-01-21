import React, { MouseEvent } from "react";
import { Direction } from "../utils/sort-array-of-objects";
import { DataFormatScheme } from "../table-row";
import "./style.scss";

type PropsType = {
  viewDataFormatScheme: DataFormatScheme;
  activeField: any;
  direction: Direction;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
};

const TabelHead: React.FC<PropsType> = (props) => {
  const arrow = require("../assets/images/arrow-sort.svg").default;

  // Первая th в массиве нужен т.к. в tbody есть дополнительный элемент стрелка
  // для развертывания дополнительной информации по строке
  let th = [<th key="firstTH"></th>];

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
          {props.viewDataFormatScheme[key].title}
          <img className="Direction-arrow" data-direction={props.direction} src={arrow} alt="sort arrow" />
        </div>
      </th>
    );
  }

  return <tr>{th}</tr>;
};

export default React.memo(TabelHead);