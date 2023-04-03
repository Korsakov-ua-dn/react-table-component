import type { Scheme } from 'shared/ui/table-with-expanded-row';
import type { ITransaction } from 'entities/transaction';

// Порядок элементов в схеме и их параметры управляют дальнейшим отображением в таблице.
export const scheme: Scheme<ITransaction> = {
  name: {
    format: 'string',
    title: 'Транспорт',
    sort: true,
    width: 200,
  },
  date: {
    format: 'date',
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
    title: 'Количество',
    sort: true,
    width: 50,
  },
  coast: {
    format: 'price',
    title: 'Стоимость',
    sort: true,
  },
};
