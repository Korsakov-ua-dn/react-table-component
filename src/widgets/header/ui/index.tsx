import React from 'react';

import { Layout } from 'components/layout';

import './style.scss';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Header: React.FC<IProps> = ({ children }) => {
  return (
    <header className="Header">
      <Layout>
        <div className="Header__container">{children}</div>
      </Layout>
    </header>
  );
};
