import { createSelector } from '@reduxjs/toolkit';

import { sortArrayOfObjects } from '../transactions-utils';

export const getAllTransactions = (state: RootState) => state.transactions.data;
export const getSearchParams = (state: RootState) =>
  state['search-transaction'].params;
// export const getSearchField = (state: RootState) =>
//   state['search-transaction'].params?.field;
// export const getSearchValue = (state: RootState) =>
//   state['search-transaction'].params?.value;
// export const getSearchField = (state: RootState) => 'point' as const;
// export const getSearchValue = (state: RootState) => '' as const;

export const getSortField = (state: RootState) => 'date' as const;
export const getDataFormat = (state: RootState) => 'date' as const;
export const getSortDirection = (state: RootState) => 'descending' as const; // "none" | "ascending" | "descending"
// field: keyof ITransaction;
// format: DataFormat;
// direction: Direction;

export const getLimit = (state: RootState) => state.transactions.limit;
export const getPage = (state: RootState) => state.transactions.page;

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
