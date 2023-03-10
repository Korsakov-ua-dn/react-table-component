import {
  DirectionType,
  FormatType,
} from '../../../components/table-component/table.types';

// Функция сортировки данных в зависимости от их типа и направления.
export function sortArrayOfObjects<T>(
  array: T[],
  field: keyof T,
  direction: DirectionType,
  format: FormatType
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
    default:
      return array;
  }
}
