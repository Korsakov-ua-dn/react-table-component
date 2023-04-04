import { dataTransferObject } from './lib';

import type { ITransaction } from 'shared/api';
import type { Scheme } from 'shared/ui/table-with-expanded-row';

/**
 * Порядок элементов в схеме и их параметры управляют дальнейшим отображением в таблице.
 */
export const scheme: Scheme<ITransaction> = {
  name: {
    format: 'string',
    title: 'Транспорт',
    sort: true,
    width: 200,
  },
  date: {
    format: 'date',
    formatDataFunction: dataTransferObject['date'],
    title: 'Дата',
    sort: true,
    width: 200,
  },
  card: {
    format: 'string',
    title: 'Карта',
    sort: false,
    width: 200,
  },
  point: {
    format: 'string',
    title: 'АЗС',
    sort: false,
    width: 100,
  },
  address: {
    format: 'string',
    title: 'Адрес',
    sort: true,
    width: 400,
  },
  fuelName: {
    format: 'string',
    title: 'Тип топлива',
    sort: false,
  },
  fuelCount: {
    format: 'number',
    formatDataFunction: dataTransferObject['fuelCount'],
    title: 'Количество',
    sort: true,
    width: 50,
  },
  coast: {
    format: 'price',
    formatDataFunction: dataTransferObject['coast'],
    title: 'Стоимость',
    sort: true,
  },
};
