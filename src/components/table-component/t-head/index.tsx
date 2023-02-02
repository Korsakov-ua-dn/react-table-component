import React from "react";
import { v1 } from "uuid";
import TheadItem from "../t-head-item";
import { Direction, ViewDataFormatScheme } from "../types";

type PropsType<T> = {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  activeField: keyof T | undefined;
  direction?: Direction;
  onSort?: (field: keyof T) => void;
};

const Thead = <T,>(props: PropsType<T>): JSX.Element => {
  /* Первая th в массиве нужен т.к. в tbody первый элемент стрелка
     для развертывания дополнительной информации по строке */
  let thead = [<th key={"FirstTH"}></th>];

  for (let key in props.viewDataFormatScheme) {
    const id = v1();
    thead.push(
      <TheadItem
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

  return (
    <thead>
      <tr>{thead}</tr>
    </thead>
  );
};

export default React.memo(Thead) as typeof Thead;
