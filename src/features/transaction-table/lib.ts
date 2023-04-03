import { DataFormat } from 'shared/ui/table-with-expanded-row';

import { Field, SortParams } from './model';

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
