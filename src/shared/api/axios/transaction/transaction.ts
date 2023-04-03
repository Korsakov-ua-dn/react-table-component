import { axiosInstance } from '../base';

import { ITransaction } from './models';

import type { AxiosPromise } from 'axios';

const BASE_URL = '/api/transactions';

export const getAll = (params?: {
  limit?: number;
  skip?: number;
}): AxiosPromise<ITransaction[]> => {
  return axiosInstance.get(BASE_URL, { params });
};
