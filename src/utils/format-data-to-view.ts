import numberFormat from "./number-format";

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

//types
export type Format = "price" | "date" | "number" | "string";
type FormatFunc = (data: any) => number | string 