import { RefObject } from 'react';

/**
 * Строки таблицы разворачиваются по клику и меняют высоту таблицы.
 * Перед выполнением печати необходимо актуализировать высоту таблицы
 * и вмонтировать тег <style> со стилями для печати.
 * tableWrapperRef - содержит все css стили для корректного отображения pdf
 * tableRef - дает информацию о полной ширине таблицы без внутреннего скролла
 */
export function getPrintPdfSettings(
  tableWrapperRef: RefObject<HTMLDivElement>,
  tableRef: RefObject<HTMLTableElement>
) {
  return {
    content: () => tableWrapperRef.current,
    documentTitle: 'table',
    onBeforeGetContent: () => {
      if (tableRef.current) {
        const style = document.createElement('style');
        style.textContent = getPageStylesForPrint(
          tableRef.current.offsetWidth,
          tableRef.current.offsetHeight
        );
        tableWrapperRef.current?.appendChild(style); // вмонтирую <style> в DOM перед печатью
      }
    },
    onAfterPrint: () => {
      if (tableWrapperRef.current?.lastChild) {
        tableWrapperRef.current.removeChild(tableWrapperRef.current.lastChild); // удаляю <style> из DOM после печати
      }
    },
    removeAfterPrint: true,
  };
}

function getPageStylesForPrint(width: number, height: number): string {
  // Convert px to mm
  const coefficient = 0.2636;
  return `
      @media print {
        html, body {
        background-color: #ffffff;
        } 
        @page {
          size: ${width * coefficient + 30}mm ${height * coefficient + 30}mm; 
          margin: 10mm;
        }
      }
    `;
}
