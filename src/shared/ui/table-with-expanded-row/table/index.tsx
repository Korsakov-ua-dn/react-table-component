import React, { RefObject } from 'react';

import type { ColorScheme } from '../types';

import './style.scss';

interface IProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: [React.ReactNode, React.ReactNode];
  colorScheme?: ColorScheme;
  tableRef?: RefObject<HTMLTableElement>;
  wrapRef?: RefObject<HTMLDivElement>;
}

export const Table: React.FC<IProps> = React.memo(
  ({ children, colorScheme, tableRef, wrapRef, ...restProps }) => {
    const classTable = `
    Table 
    ${colorScheme === 'zebra' ? 'Table_zebra' : ''}
  `;

    return (
      <div className={classTable} ref={wrapRef}>
        <table id="table" ref={tableRef} {...restProps}>
          {children}
        </table>
      </div>
    );
  }
);
