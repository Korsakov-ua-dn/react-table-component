export type ColorScheme = 'mono' | 'zebra';

export type DataFormatFunction = (data: any) => number | string;

export type Data = {
  format: DataFormat;
  title: string;
  sort: boolean;
  renderFunction?: DataFormatFunction;
  width?: number;
};

export type Scheme<T> = Partial<Record<keyof T, Data>>;

export type GetExpandedComponent<T> = (info: T) => React.ReactNode;

export type Direction = 'ascending' | 'descending' | 'none';

export type DataFormat = 'string' | 'number' | 'date' | 'price';

// export type Scheme<T> = OptinalScheme<T, keyof T>;
// type OptinalKeysInner<Value, Keys extends keyof Value> = Keys extends string
//   ? { [Key in Keys]?: Value[Keys] } extends Pick<Value, Keys>
//     ? Keys
//     : never
//   : never;

// type OptinalKeys<T> = OptinalKeysInner<T, keyof T>;

// type OptinalScheme<Value, Keys extends keyof Value> = Keys extends string
//   ? { [Key in Keys]: Data } extends object
//     ? Keys
//     : never
//   : never;

// export type NotEmpty<T> = Record<string, any> extends T ? never : T;

// export type Temp<T> = Partial<Record<keyof T, Data>>;
// export type Scheme<T> = RequireOne<Record<keyof T, Data>>;
// type RequireOne<T> = T & { [P in keyof T]: Required<Pick<T, P>> }[keyof T];

// { [P in keyof Record<keyof T, Data>]?: Record<keyof T, Data>[P] | undefined; }
