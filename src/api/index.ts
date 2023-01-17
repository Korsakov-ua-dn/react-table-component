import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PUBLIC_API_URL}`,
});

export const transactionsApi = {
  getAll(limit?: number, skip?: number) {
    return instance.get(`/api/transactions?limit=${limit}&skip=${skip}`);
  },
};

// types
export type Transaction = {
  _id: string,
  name: string,
  date: string,
  card: number,
  point: string,
  address: string,
  fuelName: string,
  fuelCount: number,
  coast: number,
  __v: number,
};