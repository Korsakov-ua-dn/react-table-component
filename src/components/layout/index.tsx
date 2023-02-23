import React from 'react';
import './style.scss';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<IProps> = (props) => {
  return <div className={'Layout'}>{props.children}</div>;
};

export default React.memo(Layout);
