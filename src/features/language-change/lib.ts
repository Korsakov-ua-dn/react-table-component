import { Locale, locales } from 'shared/lib/intl';

/**
 * Type guard для валидации localstorage responce
 */
export function isLocale(value: string | null): value is Locale {
  if (!value) return false;

  const values = Object.values(locales);
  return values.includes(value);
}
