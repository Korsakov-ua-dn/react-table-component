export type Format = "price" | "date" | "number" | "string";
export type FormatFunction = (data: any) => number | string

export type Data = {
  format: Format;
  title: string;
  sort: boolean;
  renderFunction: FormatFunction;
};
