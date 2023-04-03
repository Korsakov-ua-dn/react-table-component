import { MouseEvent, useCallback } from 'react';
import { v1 } from 'uuid';

import { typedMemo } from 'shared/hocs';

import Th from '../th';
import Tr from '../tr';

import type { Direction, Scheme } from '../types';

interface IProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  scheme: Scheme<T>;
  activeField: keyof T | undefined;
  direction?: Direction;
  onSort?: (field: keyof T) => void;
}

const Thead = <T extends object>({
  scheme,
  activeField,
  direction,
  onSort,
  ...restProps
}: IProps<T>) => {
  // Один обработчик для всех полей
  const onSortHendler = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const field = e.currentTarget.getAttribute('data-field') as keyof T;
      onSort && onSort(field);
    },
    [onSort]
  );

  const renderTh = (key: keyof T) => {
    const isSort = scheme[key]?.sort;
    const id = v1();
    return (
      <Th
        key={id}
        value={key}
        isSort={!!isSort}
        width={scheme[key]?.width}
        scheme={scheme}
        onSort={onSortHendler}
        isActiveField={activeField === key}
        direction={direction}
      />
    );
  };

  /* Первая th в массиве нужен т.к. в tbody первый элемент стрелка
     для развертывания дополнительной информации по строке */
  const trContent = [<th key={'FirstTH'}></th>];

  for (const key in scheme) {
    trContent.push(renderTh(key));
  }

  return (
    <thead className="Table__head" {...restProps}>
      <Tr>{trContent}</Tr>
    </thead>
  );
};

export default typedMemo(Thead);
