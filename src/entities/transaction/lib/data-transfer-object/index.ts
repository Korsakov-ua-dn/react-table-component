import { formatNumber } from 'shared/lib';

export const dataTransferObject = {
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
