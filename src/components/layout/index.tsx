import React from 'react';
import './style.css';

type PropsType = {
  children: React.ReactNode | React.ReactNode[] | React.ReactElement
}

const Layout:React.FC<PropsType> = (props) => {

  return (
    <div className={'Layout'}>
      {props.children}
    </div>
  )
}

export default React.memo(Layout);
