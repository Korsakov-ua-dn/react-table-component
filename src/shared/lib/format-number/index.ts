export function formatNumber(value: number, options = {}): string {
  return new Intl.NumberFormat('ru-RU', options).format(value);
}
