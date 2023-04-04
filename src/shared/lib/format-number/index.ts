/**
 * Возвращает число разделенное на разряды в формате string
 */
export function formatNumber(value: number, options = {}): string {
  return new Intl.NumberFormat('ru-RU', options).format(value);
}
