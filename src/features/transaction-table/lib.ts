import { DataFormat } from 'shared/ui/table-with-expanded-row';

import { Field, SortParams } from './model';
/**
 * @param prev Текущие параметры сортировки
 * @param field Поле по которому необходимо выполнить сортировку
 * @param format Формат данных по которым необходимо выполнить сортировку
 * @returns Возвращает новые параметры сортировки
 */
export function getSortParams(
  prev: SortParams,
  field: Field,
  format: DataFormat
): SortParams {
  if (prev?.field !== field || prev?.direction === 'none') {
    return { field, format, direction: 'ascending' };
  }
  if (prev?.direction === 'ascending') {
    return { field, format, direction: 'descending' };
  }
  if (prev?.direction === 'descending') {
    return { field, format, direction: 'none' };
  }
  return { field, format, direction: 'none' };
}
