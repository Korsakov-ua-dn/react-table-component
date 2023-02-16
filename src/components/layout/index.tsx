import React from 'react';
import './style.scss';

type PropsType = {
  children: React.ReactNode | React.ReactNode[];
}

const Layout:React.FC<PropsType> = (props) => {
  return (
    <div className={'Layout'}>
      {props.children}
    </div>
  )
}

export default React.memo(Layout);
