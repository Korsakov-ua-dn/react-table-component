import React, { MouseEvent, useCallback } from 'react';
import { v1 } from 'uuid';

import Th from '../th';
import Tr from '../tr';

// import { DirectionType, ViewDataFormatScheme } from '../table.types';

interface IProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  activeField: keyof T | undefined;
  direction?: DirectionType;
  onSort?: (field: keyof T) => void;
}

const Thead = <T extends object>({
  viewDataFormatScheme,
  activeField,
  direction,
  onSort,
  ...restProps
}: IProps<T>): JSX.Element => {
  // Один обработчик для всех полей
  // const onSortHendler = useCallback(
  //   (e: MouseEvent<HTMLElement>) => {
  //     const field = e.currentTarget.getAttribute('data-field') as keyof T;
  //     onSort && onSort(field);
  //   },
  //   [onSort]
  // );

  const renderTh = (key: keyof T) => {
    const isSort = viewDataFormatScheme[key]?.sort!;
    const id = v1();
    return (
      <Th
        key={id}
        value={key}
        isSort={isSort}
        width={viewDataFormatScheme[key]?.width}
        viewDataFormatScheme={viewDataFormatScheme}
        // onSort={onSortHendler}
        onSort={() => onSort && onSort(key)}
        isActiveField={activeField === key}
        direction={direction}
      />
    );
  };

  /* Первая th в массиве нужен т.к. в tbody первый элемент стрелка
     для развертывания дополнительной информации по строке */
  const trContent = [<th key={'FirstTH'}></th>];

  for (const key in viewDataFormatScheme) {
    trContent.push(renderTh(key));
  }

  return (
    <thead className="Table__head" {...restProps}>
      <Tr>{trContent}</Tr>
    </thead>
  );
};

export default React.memo(Thead) as typeof Thead;
