export function formatNumber(value: number, options = {}) {
  return new Intl.NumberFormat('ru-RU', options).format(value);
}
