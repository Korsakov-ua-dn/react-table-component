import React, { RefObject } from 'react';

import { ColorSchemeType } from '../table.types';
import './style.scss';

interface IProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: [React.ReactNode, React.ReactNode];
  colorScheme?: ColorSchemeType;
  tableRef?: RefObject<HTMLTableElement>;
  tableWrapperRef?: RefObject<HTMLDivElement>;
}

const TableComponent: React.FC<IProps> = ({
  children,
  colorScheme,
  tableRef,
  tableWrapperRef,
  ...restProps
}) => {
  const classTable = `
    Table 
    ${colorScheme === 'zebra' ? 'Table_zebra' : ''}
  `;

  return (
    <div className={classTable} ref={tableWrapperRef}>
      <table id="table" ref={tableRef} {...restProps}>
        {children}
      </table>
    </div>
  );
};

export default React.memo(TableComponent) as typeof TableComponent;
