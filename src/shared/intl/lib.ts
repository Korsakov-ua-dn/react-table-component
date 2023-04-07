import * as locales from './locales';

import type { Locale } from './config';

/**
 * Type guard для валидации localstorage responce
 */
export function isLocale(value: string | null): value is Locale {
  if (!value) return false;
  const keys = Object.keys(locales);
  return keys.includes(value);
}
