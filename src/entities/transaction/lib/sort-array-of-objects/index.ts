import type { DataFormat, Direction } from 'shared/ui/table-with-expanded-row';

/**
 * Функция сортировки данных в зависимости от их типа и направления сортировки.
 */
export function sortArrayOfObjects<T extends object>(
  array: T[],
  field: keyof T,
  direction: Direction,
  format: DataFormat
) {
  if (direction === 'none') return array;

  switch (format) {
    case 'string':
      return [...array].sort((a, b) =>
        direction === 'ascending'
          ? String(a[field]).localeCompare(String(b[field]))
          : String(b[field]).localeCompare(String(a[field]))
      );
    case 'number':
    case 'price':
      return [...array].sort((a, b) =>
        direction === 'ascending'
          ? Number(a[field]) - Number(b[field])
          : Number(b[field]) - Number(a[field])
      );
    case 'date':
      return [...array].sort((a, b) =>
        direction === 'ascending'
          ? new Date(String(a[field])).getTime() -
            new Date(String(b[field])).getTime()
          : new Date(String(b[field])).getTime() -
            new Date(String(a[field])).getTime()
      );
  }
}
