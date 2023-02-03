import { RefObject } from "react";
import { Transaction } from "../../api/api.types";
import {
  Direction,
  Format,
  FormatData,
  FormatFunction,
  ViewDataFormatScheme,
} from "../../components/table-component/types";

function numberFormat(value: number, options = {}) {
  return new Intl.NumberFormat("ru-RU", options).format(value);
}

// Функции форматирования данных для отображения согласно макета.
export const formatDataToView: Record<Format, FormatFunction> = {
  string: (data: any) => data,
  number: (data: any) => numberFormat(data),
  price: (data: any) => `${numberFormat(data)} ₽`,
  date: (data: any) => {
    const date = new Date(data);
    return date
      .toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");
  },
};

// Порядок элементов в схеме и их параметры управляют отображением в таюлице.
export const viewDataScheme: ViewDataFormatScheme<Transaction> = {
  name: {
    format: "string",
    title: "Транспорт",
    sort: true,
    renderFunction: formatDataToView["string"],
    width: 200,
  },
  date: {
    format: "date",
    title: "Дата",
    sort: true,
    renderFunction: formatDataToView["date"],
    width: 200,
  },
  card: {
    format: "string",
    title: "Карта",
    sort: false,
    renderFunction: formatDataToView["string"],
    width: 200,
  },
  point: {
    format: "string",
    title: "АЗС",
    sort: false,
    renderFunction: formatDataToView["string"],
    width: 100,
  },
  address: {
    format: "string",
    title: "Адрес",
    sort: true,
    renderFunction: formatDataToView["string"],
    width: 400,
  },
  fuelName: {
    format: "string",
    title: "Тип топлива",
    sort: false,
    renderFunction: formatDataToView["string"],
  },
  fuelCount: {
    format: "number",
    title: "Количество",
    sort: true,
    renderFunction: formatDataToView["number"],
    width: 50,
  },
  coast: {
    format: "price",
    title: "Стоимость",
    sort: true,
    renderFunction: formatDataToView["price"],
  },
}; // ViewDataFormatScheme<Transaction> === Partial<Record<keyof Transaction, Data>>

// Функция сортировки данных в зависимости от их типа и направления.
export function sortArrayOfObjects<T>(
  array: T[],
  field: keyof T,
  direction: Direction,
  format: FormatData
) {
  if (direction === "none") return array;

  switch (format) {
    case "string":
      return [...array].sort((a, b) =>
        direction === "ascending"
          ? String(a[field]).localeCompare(String(b[field]))
          : String(b[field]).localeCompare(String(a[field]))
      );
    case "number":
    case "price":
      return [...array].sort((a, b) =>
        direction === "ascending"
          ? Number(a[field]) - Number(b[field])
          : Number(b[field]) - Number(a[field])
      );
    case "date":
      return [...array].sort((a, b) =>
        direction === "ascending"
          ? new Date(String(a[field])).getTime() -
            new Date(String(b[field])).getTime()
          : new Date(String(b[field])).getTime() -
            new Date(String(a[field])).getTime()
      );
    default:
      return array;
  }
}

// Печать PDF
function getPageStylesForPrint (
  width: number,
  height: number
): string {
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

/**
 * Строки таблицы разворачиваются по клику и меняют высоту таблицы.
 * Перед выполнением печати необходимо актуализировать высоту таблицы
 * и вмонтировать тег <style> со стилями для печати.
 * tableWrapperRef - содержит все css стили для корректного отображения pdf
 * tableRef - дает информацию о полной ширине таблицы без внутреннего скролла
 */
export function getPrintPdfSettings (
  tableWrapperRef: RefObject<HTMLDivElement>, 
  tableRef: RefObject<HTMLTableElement>
) {
  return {
    content: () => tableWrapperRef.current,
    documentTitle: "table",
    onBeforeGetContent: () => {
      if (tableRef.current) {
        const style = document.createElement("style");
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
  }
};
