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

export const getPageStylesForPrint = (
  width: number,
  height: number
): string => {
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
