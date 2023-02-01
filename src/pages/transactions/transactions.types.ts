import { Transaction } from "../../api/api.types";
import { Direction, FormatData } from "../../components/table-component/types";

export type Field = keyof Transaction;
export type Search = { field: keyof Transaction; value: string } | null;
export type Sort = {
  field: keyof Transaction;
  format: FormatData;
  direction: Direction;
} | null;
