import { v1 } from 'uuid';

import { typedMemo } from 'shared/hocs';

import TrBody from '../tr-body';

import type { GetExpandedComponent, Scheme } from '../types';

interface IProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  items: T[];
  scheme: Scheme<T>;
  getExpandedComponent: GetExpandedComponent<T>;
}

const Tbody = <T extends object>({
  items,
  scheme,
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
        scheme={scheme}
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

export default typedMemo(Tbody);
