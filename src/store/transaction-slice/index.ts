import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Transaction, transactionsApi } from "../../api";

// thunk
export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  undefined,
  { rejectValue: string }
>("transactions/GET_ALL", async (_, { rejectWithValue }) => {
  try {
    const response = await transactionsApi.getAll();
    return await response.data;
  } catch (err) {
    return rejectWithValue(
      "Произошла ошибка, попробуйте перезагрузить страницу"
    );
  }
});

// slice
const initialState: TransactionState = {
  data: [],
  sort: "",
  limit: 5,
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setLimit(state, action: PayloadAction<Limit>) {
      state.limit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const transactionActions = transactionsSlice.actions;
export default transactionsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

// types
type TransactionState = {
  data: Transaction[];
  sort: Sort;
  limit: Limit;
  loading: boolean;
  error: string | null;
};

export type Sort =
  | ""
  | "name"
  | "date"
  | "card"
  | "point"
  | "address"
  | "fuelName"
  | "fuelCount"
  | "coast"; //@todo partial type

export type Limit = 5 | 10 | 25;
