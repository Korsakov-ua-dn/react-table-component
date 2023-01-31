import React from "react";
import { v1 } from "uuid";
import TableHeadItem from "../table-head-item";
import { Direction, ViewDataFormatScheme } from "../types";
import "./style.scss";

type PropsType<T> = {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  activeField: keyof T | undefined;
  direction: Direction;
  onSort: null | ((field: keyof T) => void);
};

const TableHead = <T,>(props: PropsType<T>): JSX.Element => {
  // Первая th в массиве нужен т.к. в tbody есть дополнительный элемент стрелка
  // для развертывания дополнительной информации по строке
  let th = [<th key={"FirstTH"}></th>];

  for (let key in props.viewDataFormatScheme) {
    const id = v1();
    th.push(
      <TableHeadItem
        key={id}
        value={key}
        isSort={props.viewDataFormatScheme[key]?.sort!}
        width={props.viewDataFormatScheme[key]?.width}
        viewDataFormatScheme={props.viewDataFormatScheme}
        onSort={props.onSort}
        isActiveField={props.activeField === key}
        direction={props.direction}
      />
    );
  }

  return <tr>{th}</tr>;
};

export default React.memo(TableHead) as typeof TableHead;
