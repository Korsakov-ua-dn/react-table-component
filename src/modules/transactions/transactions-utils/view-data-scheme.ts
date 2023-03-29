import { ITransaction } from '../types';

import { formatDataToView } from './format-data-to-view';

import type { Scheme } from 'shared/ui/table-with-expanded-row';

// Порядок элементов в схеме и их параметры управляют отображением в таблице.
export const viewDataScheme: Scheme<ITransaction> = {
  name: {
    format: 'string',
    title: 'Транспорт',
    sort: true,
    renderFunction: formatDataToView['string'],
    width: 200,
  },
  date: {
    format: 'date',
    title: 'Дата',
    sort: true,
    renderFunction: formatDataToView['date'],
    width: 200,
  },
  card: {
    format: 'string',
    title: 'Карта',
    sort: false,
    renderFunction: formatDataToView['string'],
    width: 200,
  },
  point: {
    format: 'string',
    title: 'АЗС',
    sort: false,
    renderFunction: formatDataToView['string'],
    width: 100,
  },
  address: {
    format: 'string',
    title: 'Адрес',
    sort: true,
    renderFunction: formatDataToView['string'],
    width: 400,
  },
  fuelName: {
    format: 'string',
    title: 'Тип топлива',
    sort: false,
    renderFunction: formatDataToView['string'],
  },
  fuelCount: {
    format: 'number',
    title: 'Количество',
    sort: true,
    renderFunction: formatDataToView['number'],
    width: 50,
  },
  coast: {
    format: 'price',
    title: 'Стоимость',
    sort: true,
    renderFunction: formatDataToView['price'],
  },
};
