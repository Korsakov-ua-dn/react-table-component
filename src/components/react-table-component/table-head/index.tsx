import React, { MouseEvent } from "react";
import { ViewDataFormatScheme } from "../types";
import { Direction } from "../utils/sort-array-of-objects";
import WithTooltip from "../with-tooltip";
import "./style.scss";

type PropsType<T> = {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  activeField: keyof T | undefined;
  direction: Direction;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
};

const TableHead = <T,>(props: PropsType<T>): JSX.Element => {
  const arrow = require("../assets/images/arrow-sort.svg").default;

  // Первая th в массиве нужен т.к. в tbody есть дополнительный элемент стрелка
  // для развертывания дополнительной информации по строке
  let th = [<th key="firstTH"></th>];

  for (let key in props.viewDataFormatScheme) {
    const isSort = props.viewDataFormatScheme[key]?.sort;
    const width = props.viewDataFormatScheme[key]?.width;

    th.push(
      <th
        key={key}
        onClick={isSort ? props.onSort : () => {}}
        data-field={key}
        data-format={props.viewDataFormatScheme[key]?.format}
        className={`Table__header-item ${
          props.activeField === key ? "Table__header-item_active" : ""
        }`}
        style={width ? { maxWidth: `${width}px`, minWidth: `${width}px` } : {}}
      >
        <WithTooltip>
          <div>
            {props.viewDataFormatScheme[key]?.title}
            <img
              className="Direction-arrow"
              data-direction={props.direction}
              src={arrow}
              alt="sort arrow"
            />
          </div>
        </WithTooltip>
      </th>
    );
  }

  return <tr>{th}</tr>;
};

export default React.memo(TableHead) as typeof TableHead;
