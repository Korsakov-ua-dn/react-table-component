import React from 'react';
import { v1 } from 'uuid';

import TbodyRow from '../t-body-row';
import { ExpandedContentComponent, ViewDataFormatScheme } from '../table.types';

interface IProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  items: T[];
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  getExpandedContentComponent: ExpandedContentComponent;
}

const Tbody = <T extends object>({
  items,
  viewDataFormatScheme,
  getExpandedContentComponent,
  ...restProps
}: IProps<T>): JSX.Element => {
  const tbody = items.map((row, i) => {
    const id = v1();
    return (
      <TbodyRow
        key={id}
        row={row}
        painted={i % 2 === 0} // покрасить зеброй
        viewDataFormatScheme={viewDataFormatScheme}
        getExpandedContentComponent={getExpandedContentComponent}
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
