import {
  FormatFunctionType,
  FormatType,
} from '../../../components/table-component/table.types';

import { formatNumber } from './formatNumber';

// Функции форматирования данных для отображения согласно макета.
export const formatDataToView: Record<FormatType, FormatFunctionType> = {
  string: (data: any) => data,
  number: (data: any) => formatNumber(data),
  price: (data: any) => `${formatNumber(data)} ₽`,
  date: (data: any) => {
    const date = new Date(data);
    return date
      .toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', '');
  },
};
