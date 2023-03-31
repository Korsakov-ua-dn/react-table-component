import { FC, RefObject, memo } from 'react';

import { useAppSelector } from 'shared/hooks';

import { getTransactionsByPage } from 'entities/transaction/model/selectors';

import { scheme } from 'features/transaction-table/config';
import { PdfDownload } from 'features/pdf-download';
import { XlsDownload } from 'features/xls-download';
import { SearchPanel } from 'features/searchTransaction/ui';

import { ComponentLayout } from './component-layout';
import { DownloadBlock } from './download-block';

interface IProps {
  wrapRef: RefObject<HTMLDivElement>;
  tableRef: RefObject<HTMLTableElement>;
}

export const TransactionControls: FC<IProps> = memo(({ wrapRef, tableRef }) => {
  const transactionsByPage = useAppSelector(getTransactionsByPage);

  return (
    <ComponentLayout>
      <DownloadBlock>
        <PdfDownload wrapRef={wrapRef} tableRef={tableRef} />
        <XlsDownload items={transactionsByPage} viewDataFormatScheme={scheme} />
      </DownloadBlock>

      <SearchPanel viewDataFormatScheme={scheme} />
    </ComponentLayout>
  );
});
