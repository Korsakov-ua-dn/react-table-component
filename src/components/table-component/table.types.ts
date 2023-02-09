export type ColorSchemeType = "mono" | "zebra";
export type FormatFunctionType = (data: any) => number | string

export type Data = {
  format: FormatType;
  title: string;
  sort: boolean;
  renderFunction?: FormatFunctionType;
  width?: number;
};

export type ViewDataFormatScheme<T> = Partial<Record<keyof T, Data>>;

export type ExpandedContentComponent = <T>(info: T) => React.ReactElement<T>;

export type DirectionType = "ascending" | "descending" | "none";

export type FormatType = "string" | "number" | "date" | "price";