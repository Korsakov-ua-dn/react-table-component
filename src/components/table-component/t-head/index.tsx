import React, { MouseEvent, useCallback } from "react";
import { v1 } from "uuid";
import TheadItem from "../t-head-item";
import { DirectionType, ViewDataFormatScheme } from "../table.types";

interface IProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  activeField: keyof T | undefined;
  direction?: DirectionType;
  onSort?: (field: keyof T) => void;
};

const Thead = <T extends object>({
  viewDataFormatScheme,
  activeField,
  direction,
  onSort,
  ...restProps
}: IProps<T>): JSX.Element => {

  // Один обработчик для всех полей
  const onSortHendler = useCallback((e: MouseEvent<HTMLElement>) => {
    const field = e.currentTarget.getAttribute('data-field') as keyof T
    onSort && onSort(field)
  }, [onSort])

  /* Первая th в массиве нужен т.к. в tbody первый элемент стрелка
     для развертывания дополнительной информации по строке */
  let thead = [<th key={"FirstTH"}></th>];

  for (let key in viewDataFormatScheme) {
    const isSort = viewDataFormatScheme[key]?.sort!
    const id = v1();
    thead.push(
      <TheadItem
        key={id}
        value={key}
        isSort={isSort}
        width={viewDataFormatScheme[key]?.width}
        viewDataFormatScheme={viewDataFormatScheme}
        onSort={onSortHendler}
        isActiveField={activeField === key}
        direction={direction}
      />
    );
  }

  return (
    <thead className="Table__head" {...restProps}>
      <tr>{thead}</tr>
    </thead>
  );
};

export default React.memo(Thead) as typeof Thead;
