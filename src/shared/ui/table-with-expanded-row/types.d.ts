declare type ColorSchemeType = 'mono' | 'zebra';

declare type FormatFunctionType = (data: any) => number | string;

declare type Data = {
  format: FormatType;
  title: string;
  sort: boolean;
  renderFunction?: FormatFunctionType;
  width?: number;
};

declare type ViewDataFormatScheme<T> = Partial<Record<keyof T, Data>>;

declare type ExpandedContentComponent = <T>(info: T) => React.ReactElement<T>;

declare type DirectionType = 'ascending' | 'descending' | 'none';

declare type FormatType = 'string' | 'number' | 'date' | 'price';
