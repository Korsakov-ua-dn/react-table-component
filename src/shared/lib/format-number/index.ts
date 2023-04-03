export function formatNumber(value: number, options = {}): number {
  return Number(new Intl.NumberFormat('ru-RU', options).format(value));
}
