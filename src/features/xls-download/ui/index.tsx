import React from 'react';

import { IconButton } from 'shared/ui/icon-button';
import { Scheme } from 'shared/ui/table-with-expanded-row';

import { onDownloadXlsx } from '../lib';

import xlsIcon from './xls-icon.svg';

interface IProps<T> {
  items: T[];
  scheme: Scheme<T>;
  title: string;
}

const XlsDownload = <T extends object>({
  items,
  scheme,
  title,
}: IProps<T>): JSX.Element => {
  const onClickHandler = () => onDownloadXlsx(items, scheme, title);

  return (
    <IconButton
      className="xls"
      iconHref={xlsIcon}
      onClick={onClickHandler}
    ></IconButton>
  );
};

export default React.memo(XlsDownload) as typeof XlsDownload;
