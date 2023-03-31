import { FC, ReactNode } from 'react';

import { Layout } from '../layout';

import './style.scss';

interface IProps {
  children: string | ReactNode | ReactNode[];
}

export const PageLayout: FC<IProps> = (props) => {
  return (
    <section className="PageLayout">
      <Layout>{props.children}</Layout>
    </section>
  );
};
