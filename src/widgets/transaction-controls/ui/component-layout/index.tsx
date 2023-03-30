import { FC, ReactNode } from 'react';
import './style.scss';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const ComponentLayout: FC<IProps> = (props) => {
  return <div className="TransactionControls">{props.children}</div>;
};
