import { Format } from "../table-row";

export const formatDataToView:Record<Format, FormatFunc> = {
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

export default function numberFormat(value: number, options = {}){
  return new Intl.NumberFormat('ru-RU', options).format(value)
}

//types
type FormatFunc = (data: any) => number | string 