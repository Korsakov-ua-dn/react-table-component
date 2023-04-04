import { memo } from 'react';

import { useAppSelector } from 'shared/hooks';

import { getTransactionsByPage, scheme } from 'entities/transaction';

import { PdfDownload } from 'features/pdf-download';
import { XlsDownload } from 'features/xls-download';
import { SearchPanel } from 'features/transaction-search';

import { ComponentLayout } from './component-layout';
import { DownloadBlock } from './download-block';

interface IProps {
  wrapRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLTableElement>;
}

export const TransactionControls: React.FC<IProps> = memo(
  ({ wrapRef, tableRef }) => {
    const transactionsByPage = useAppSelector(getTransactionsByPage);

    return (
      <ComponentLayout>
        <DownloadBlock>
          <PdfDownload wrapRef={wrapRef} tableRef={tableRef} />
          <XlsDownload
            items={transactionsByPage}
            scheme={scheme}
            title="transactions"
          />
        </DownloadBlock>

        <SearchPanel scheme={scheme} />
      </ComponentLayout>
    );
  }
);
