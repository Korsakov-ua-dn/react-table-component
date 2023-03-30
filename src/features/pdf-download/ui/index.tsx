import React, { RefObject, useCallback, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconButton } from 'shared/ui/icon-button';

import { getPrintPdfSettings } from '../lib';

import pdfIcon from './pdf-icon.svg';

interface IProps {
  wrapRef: RefObject<HTMLDivElement>;
  tableRef: RefObject<HTMLTableElement>;
}

export const PdfDownload: React.FC<IProps> = ({ wrapRef, tableRef }) => {
  // Мемоизация динамически генерируемого коллбэка
  const printFuncRef = useRef<() => void>();
  printFuncRef.current = useReactToPrint(
    getPrintPdfSettings(wrapRef, tableRef)
  );

  const memoizedPrintPdf = useCallback(() => {
    printFuncRef.current && printFuncRef.current();
  }, []);

  return (
    <IconButton
      className="pdf"
      iconHref={pdfIcon}
      onClick={memoizedPrintPdf}
    ></IconButton>
  );
};
