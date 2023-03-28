import React from 'react';

import './style.scss';

interface IProps<T> {
  row: T;
  getExpandedContentComponent: ExpandedContentComponent;
}

const ExpandedRow = <T extends object>(props: IProps<T>): JSX.Element => {
  return (
    <tr className={'Expanding-content'}>
      <td colSpan={Object.keys(props.row).length}>
        <div className="Expanding-content__Detailed-information">
          {props.getExpandedContentComponent(props.row)}
        </div>
      </td>
    </tr>
  );
};

export default React.memo(ExpandedRow) as typeof ExpandedRow;
