import { ReactNode } from 'react';

import { Layout } from 'shared/ui/layout';

import './style.scss';

interface IProps {
  children: ReactNode | ReactNode[];
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
