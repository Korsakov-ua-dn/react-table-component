import { FC, ReactNode } from 'react';
import './style.scss';

interface IProps {
  children: [ReactNode, ReactNode];
}

export const DownloadBlock: FC<IProps> = (props) => {
  return <div className="DownloadBlock">{props.children}</div>;
};
