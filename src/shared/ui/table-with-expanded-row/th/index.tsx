import React, { MouseEvent } from 'react';

import WithTooltip from 'shared/ui/with-tooltip';

import arrow from './arrow-sort.svg';
import './style.scss';

import type { Direction, Scheme } from '../types';

interface IProps<T> {
  value: Partial<keyof T>;
  isSort: boolean;
  width: number | undefined;
  viewDataFormatScheme: Scheme<T>;
  isActiveField: boolean;
  direction?: Direction;
  onSort?: (e: MouseEvent<HTMLElement>) => void;
}

const Th = <T,>(props: IProps<T>): JSX.Element => {
  const classN = `
    Table__head-item 
    ${props.isActiveField ? 'Table__head-item_active' : ''}
  `;

  const style = props.width ? { maxWidth: `${props.width}px` } : {};

  return (
    <th
      onClick={props.isSort ? props.onSort : () => {}}
      className={classN}
      data-field={props.value}
    >
      <div style={style}>
        <WithTooltip>
          {props.viewDataFormatScheme[props.value]?.title!}
        </WithTooltip>

        {props.isSort && props.onSort && (
          <img
            className="Direction-arrow"
            data-direction={props.direction}
            src={arrow}
            alt="sort arrow"
          />
        )}
      </div>
    </th>
  );
};

export default React.memo(Th) as typeof Th;
