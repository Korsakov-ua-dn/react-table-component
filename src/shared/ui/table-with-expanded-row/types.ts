export type ColorScheme = 'mono' | 'zebra';

export type FormatDataFunction = (data: any) => number | string;

export type Data = {
  format: DataFormat;
  formatDataFunction?: FormatDataFunction;
  title: string;
  sort: boolean;
  width?: number;
};

export type Scheme<T> = Partial<Record<keyof T, Data>>;

export type GetExpandedComponent<T> = (info: T) => React.ReactNode;

export type Direction = 'ascending' | 'descending' | 'none';

export type DataFormat = 'string' | 'number' | 'date' | 'price';
