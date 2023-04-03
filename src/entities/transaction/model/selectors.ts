import { createSelector } from '@reduxjs/toolkit';

import { sortArrayOfObjects } from '../lib';
import { scheme } from '../config';

// Возвращает отфильтрованный массив транзакций согласно параметров поиска
const getAllTransactions = (state: RootState) => state.transaction.data;
const getSearchParams = (state: RootState) =>
  state['transaction-search'].params;
const getTransactionsBySearch = createSelector(
  [getAllTransactions, getSearchParams],
  (allTransactions, params) => {
    if (params?.field && params.value) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${params.value}`, 'i');
      const formatDataFn = scheme[params.field]?.formatDataFunction;

      return allTransactions.filter((item) => {
        // для поля 'Дата' перед проверкой регуляркой выполняю приведение данных к единому формату
        const value =
          formatDataFn && params.field === 'date'
            ? formatDataFn(item[params.field])
            : item[params.field];

        return regex.test(value.toString());
      });
    } else return allTransactions;
  }
);

// Возвращает отсортированный массив транзакций согласно параметров сортировки
const getSortParams = (state: RootState) => state['transaction-sort'].params;
export const getSortTransactions = createSelector(
  [getTransactionsBySearch, getSortParams],
  (transactionsBySearch, params) => {
    if (params) {
      return sortArrayOfObjects(
        transactionsBySearch,
        params.field,
        params.direction,
        params.format
      );
    } else return transactionsBySearch;
  }
);

// Возвращает отфильтрованный массив транзакций согласно параметров пагинации
const getLimit = (state: RootState) => state['transaction-pagination'].limit;
const getPage = (state: RootState) => state['transaction-pagination'].page;
export const getTransactionsByPage = createSelector(
  [getSortTransactions, getLimit, getPage],
  (sortTransactions, limit, page) => {
    return sortTransactions.filter(
      (_, i) => i < limit * (page + 1) && i >= limit * page
    );
  }
);
