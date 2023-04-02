import { typedMemo } from 'shared/hocs';

import type { GetExpandedComponent } from '../types';

import './style.scss';

interface IProps<T> {
  row: T;
  getExpandedComponent: GetExpandedComponent<T>;
}

const ExpandedRow = <T extends object>(props: IProps<T>): JSX.Element => {
  return (
    <tr className={'Expanding-content'}>
      <td colSpan={Object.keys(props.row).length}>
        <div className="Expanding-content__Detailed-information">
          {props.getExpandedComponent(props.row)}
        </div>
      </td>
    </tr>
  );
};

export default typedMemo(ExpandedRow);
