import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../";
import { Transaction, transactionsApi } from "../../api";

// thunk
// Запрос на сервер с указанием limit и skip параметров
// export const fetchAllTransactions = createAsyncThunk<
//   Transaction[],
//   {
//     limit: number;
//     page: number;
//   } | undefined,
//   { rejectValue: string, state: RootState  }
// >("transactions/GET_ALL", async (payload, { rejectWithValue, getState }) => {
//   try {
//     if (payload) {
//       const response = await transactionsApi.getAll(
//         payload.limit, 
//         payload.page*payload.limit
//       );
//       return await response.data
//     }

//     const { page, limit } = getState().transactions;
//     const response = await transactionsApi.getAll(limit, page*limit);
//     return await response.data;

//   } catch (err) {
//     return rejectWithValue(
//       "Произошла ошибка, попробуйте перезагрузить страницу"
//     );
//   }
// }); 
export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  undefined,
  { rejectValue: string, state: RootState  }
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
  limit: 1,
  page: 0,
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // setSort(state, action: PayloadAction<Sort>) {
    //   state.sort = action.payload
    // },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
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
  limit: number;
  page: number;
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

// export type Limit = 1 | 5 | 10 | 25;
