import { createSelector } from '@reduxjs/toolkit';

import { sortArrayOfObjects } from '../lib';

const getAllTransactions = (state: RootState) => state.transaction.data;
const getSearchParams = (state: RootState) =>
  state['search-transaction'].params;

const getSortField = (state: RootState) => 'date' as const;
const getDataFormat = (state: RootState) => 'date' as const;
const getSortDirection = (state: RootState) => 'descending' as const;

const getLimit = (state: RootState) => state['transaction-pagination'].limit;
const getPage = (state: RootState) => state['transaction-pagination'].page;

const getTransactionsBySearch = createSelector(
  [getAllTransactions, getSearchParams],
  (allTransactions, params) => {
    if (params) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${params.value}`, 'i');
      return allTransactions.filter((item) =>
        regex.test(String(item[params.field]))
      );
    } else return allTransactions;
  }
);

export const getSortTransactions = createSelector(
  [getTransactionsBySearch, getSortField, getDataFormat, getSortDirection],
  (transactionsBySearch, sortField, dataFormat, sortDirection) => {
    if (sortField && dataFormat && sortDirection) {
      return sortArrayOfObjects(
        transactionsBySearch,
        sortField,
        sortDirection,
        dataFormat
      );
    } else return transactionsBySearch;
  }
);

export const getTransactionsByPage = createSelector(
  [getSortTransactions, getLimit, getPage],
  (sortTransactions, limit, page) => {
    return sortTransactions.filter(
      (_, i) => i < limit * (page + 1) && i >= limit * page
    );
  }
);
