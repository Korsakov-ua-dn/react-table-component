import type { DataFormat, Direction } from 'shared/ui/table-with-expanded-row';

export interface ITransaction {
  _id: string;
  name: string;
  date: string;
  card: number;
  point: string;
  address: string;
  fuelName: string;
  fuelCount: number;
  coast: number;
  __v: number;
}

export type FieldType = keyof ITransaction;
export type SearchType = { field: keyof ITransaction; value: string } | null;
export type SortType = {
  field: keyof ITransaction;
  format: DataFormat;
  direction: Direction;
} | null;
