import { FC, ReactNode } from 'react';

import { Layout } from 'components/layout';

import './style.scss';

interface IProps {
  children: string | ReactNode | ReactNode[];
}

export const PageLayout: FC<IProps> = (props) => {
  return (
    <main className="PageLayout">
      <Layout>{props.children}</Layout>
    </main>
  );
};
