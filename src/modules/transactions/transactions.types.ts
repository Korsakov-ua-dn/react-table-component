import { Direction, FormatData } from "../../components/table-component/types";

export type Transaction = {
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
};
export type Field = keyof Transaction;
export type Search = { field: keyof Transaction; value: string } | null;
export type Sort = {
  field: keyof Transaction;
  format: FormatData;
  direction: Direction;
} | null;
