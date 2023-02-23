import React from 'react';
import './style.scss';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const TableControls: React.FC<IProps> = (props) => {
  return <div className="Table-controls">{props.children}</div>;
};

export default React.memo(TableControls) as typeof TableControls;
