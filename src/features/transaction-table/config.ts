import { formatDataScheme } from './lib/format-data-scheme';

import type { Scheme } from 'shared/ui/table-with-expanded-row';
import type { ITransaction } from 'shared/api';

export const mapContainerStyle = {
  height: '200px',
};

// Порядок элементов в схеме и их параметры управляют отображением в таблице.
export const scheme: Scheme<ITransaction> = {
  name: {
    format: 'string',
    title: 'Транспорт',
    sort: true,
    renderFunction: formatDataScheme['string'],
    width: 200,
  },
  date: {
    format: 'date',
    title: 'Дата',
    sort: true,
    renderFunction: formatDataScheme['date'],
    width: 200,
  },
  card: {
    format: 'string',
    title: 'Карта',
    sort: false,
    renderFunction: formatDataScheme['string'],
    width: 200,
  },
  point: {
    format: 'string',
    title: 'АЗС',
    sort: false,
    renderFunction: formatDataScheme['string'],
    width: 100,
  },
  address: {
    format: 'string',
    title: 'Адрес',
    sort: true,
    renderFunction: formatDataScheme['string'],
    width: 400,
  },
  fuelName: {
    format: 'string',
    title: 'Тип топлива',
    sort: false,
    renderFunction: formatDataScheme['string'],
  },
  fuelCount: {
    format: 'number',
    title: 'Количество',
    sort: true,
    renderFunction: formatDataScheme['number'],
    width: 50,
  },
  coast: {
    format: 'price',
    title: 'Стоимость',
    sort: true,
    renderFunction: formatDataScheme['price'],
  },
};
