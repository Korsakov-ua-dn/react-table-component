import { RefObject } from 'react';

/**
 * Строки таблицы разворачиваются по клику и меняют высоту таблицы.
 * Перед выполнением печати необходимо актуализировать высоту таблицы
 * и вмонтировать тег <style> со стилями для печати.
 * wrapRef - содержит все css стили для корректного отображения pdf
 * tableRef - дает информацию о полной ширине таблицы без внутреннего скролла
 */
export function getPrintPdfSettings(
  wrapRef: RefObject<HTMLDivElement>,
  tableRef: RefObject<HTMLTableElement>
) {
  return {
    content: () => wrapRef.current,
    documentTitle: 'table',
    onBeforeGetContent: () => {
      if (tableRef.current) {
        const style = document.createElement('style');
        style.textContent = getPageStylesForPrint(
          tableRef.current.offsetWidth,
          tableRef.current.offsetHeight
        );
        wrapRef.current?.appendChild(style); // вмонтирую <style> в DOM перед печатью
      }
    },
    onAfterPrint: () => {
      if (wrapRef.current?.lastChild) {
        wrapRef.current.removeChild(wrapRef.current.lastChild); // удаляю <style> из DOM после печати
      }
    },
    removeAfterPrint: true,
  };
}

function getPageStylesForPrint(width: number, height: number): string {
  const coefficient = 0.2636; // Convert px to mm
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
