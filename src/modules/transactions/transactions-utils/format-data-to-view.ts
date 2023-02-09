import {
  Format,
  FormatFunction,
} from "../../../components/table-component/types";
import { formatNumber } from "./formatNumber";

// Функции форматирования данных для отображения согласно макета.
export const formatDataToView: Record<Format, FormatFunction> = {
  string: (data: any) => data,
  number: (data: any) => formatNumber(data),
  price: (data: any) => `${formatNumber(data)} ₽`,
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
