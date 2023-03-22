import React from 'react';

import { Layout } from '../layout';

import './style.scss';

interface IProps {
  children: string | React.ReactNode | React.ReactNode[];
}

export const MainLayout: React.FC<IProps> = (props) => {
  return (
    <main className="Main">
      <Layout>{props.children}</Layout>
    </main>
  );
};
