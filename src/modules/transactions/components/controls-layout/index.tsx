import React from 'react';
import './style.scss';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ControlsLayout: React.FC<IProps> = (props) => {
  return <div className="Table-controls">{props.children}</div>;
};
