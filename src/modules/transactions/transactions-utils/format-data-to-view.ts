import { formatNumber } from './formatNumber';

import type {
  DataFormat,
  DataFormatFunction,
} from 'shared/ui/table-with-expanded-row';

// Функции форматирования данных для отображения согласно макета.
export const formatDataToView: Record<DataFormat, DataFormatFunction> = {
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
