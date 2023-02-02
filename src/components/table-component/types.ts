export type ColorScheme = "mono" | "zebra";
export type Format = "price" | "date" | "number" | "string"; // необходим для правильной сортировки 
export type FormatFunction = (data: any) => number | string

export type Data = {
  format: Format;
  title: string;
  sort: boolean;
  renderFunction: FormatFunction;
  width?: number;
};

export type ViewDataFormatScheme<T> = Partial<Record<keyof T, Data>>;

export type ExpandedContentComponent = <T>(info: T) => React.ReactElement<T>;

export type Direction = "ascending" | "descending" | "none";

export type FormatData = "string" | "number" | "date" | "price";