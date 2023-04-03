import { IServerTransaction } from 'shared/api';

import { formatNumber } from 'shared/lib';

const dataTransferObject = {
  date: (data: string): string => {
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
  fuelCount: (data: number) => formatNumber(data),
  coast: (data: number) => `${formatNumber(data)} ₽`,
};

export function formatTransactionData(
  obj: IServerTransaction
): Omit<IServerTransaction, 'coast'> & { coast: string } {
  return {
    ...obj,
    date: dataTransferObject['date'](obj['date']),
    fuelCount: dataTransferObject['fuelCount'](obj['fuelCount']),
    coast: dataTransferObject['coast'](obj['coast']),
  };
}

export type ITransaction = ReturnType<typeof formatTransactionData>;
