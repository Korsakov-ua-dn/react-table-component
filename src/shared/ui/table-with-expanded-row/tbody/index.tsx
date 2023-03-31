import React from 'react';
import { v1 } from 'uuid';

import TrBody from '../tr-body';

import type { GetExpandedComponent, Scheme } from '../types';

interface IProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  items: T[];
  viewDataFormatScheme: Scheme<T>;
  getExpandedComponent: GetExpandedComponent<T>;
}

const Tbody = <T extends object>({
  items,
  viewDataFormatScheme,
  getExpandedComponent,
  ...restProps
}: IProps<T>): JSX.Element => {
  const tbody = items.map((row, i) => {
    const id = v1();
    return (
      <TrBody
        key={id}
        row={row}
        painted={i % 2 === 0} // покрасить зеброй
        viewDataFormatScheme={viewDataFormatScheme}
        getExpandedComponent={getExpandedComponent}
      />
    );
  });

  return (
    <tbody className="Table__body" {...restProps}>
      {tbody}
    </tbody>
  );
};

export default React.memo(Tbody) as typeof Tbody;
