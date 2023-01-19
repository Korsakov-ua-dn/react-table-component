import { useCallback } from "react";
import { useReactToPrint } from "react-to-print";

// Строки таблицы разворачиваются по клику и меняют высоту таблицы.
// Перед выполнением печати необходимо актуализировать высоту таблицы
// и вмонтировать тег <style> со стилями для печати
export const usePrintPdf = (
  tableWrapper: HTMLDivElement | null,
  table: HTMLTableElement | null,
  dependenciesArray: any[],
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onPrintPdf = useCallback(useReactToPrint({
    content: () => tableWrapper,
    documentTitle: "table",
    onBeforeGetContent: () => {
      if (table) {
        const style = document.createElement("style");
        style.textContent = getPageStylesForPrint(
          table.offsetWidth,
          table.offsetHeight
        );
        tableWrapper?.appendChild(style); // вмонтирую <style> в DOM перед печатью
      }
    },
    onAfterPrint: () => {
      if (tableWrapper?.lastChild) {
        tableWrapper.removeChild(tableWrapper.lastChild);
      }
    }, // удаляю <style> из DOM после печати
    removeAfterPrint: true,
  }), [dependenciesArray]);

  return onPrintPdf;
};

const getPageStylesForPrint = (width: number, height: number): string => {
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
};
