import React from 'react';
import './style.scss';

interface IProps {
  children: string | React.ReactNode | React.ReactNode[];
}

export const Layout: React.FC<IProps> = (props) => {
  return <div className={'Layout'}>{props.children}</div>;
};
