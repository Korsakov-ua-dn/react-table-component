import React, { ReactNode } from 'react';

import './style.scss';

interface IProps {
  children: [ReactNode, ReactNode];
}

export const ComponentLayout: React.FC<IProps> = React.memo(({ children }) => {
  return <div className="SearchTransactionPanel">{children}</div>;
});
