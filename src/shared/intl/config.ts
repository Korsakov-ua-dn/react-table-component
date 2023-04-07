import * as locales from './locales';
import { useTranslation } from './use-translation';

export type Wordbook = valueof<typeof locales>;

export type Locale = keyof typeof locales;

export const keys = Object.keys(locales);

export type Translate<T> = ReturnType<
  typeof useTranslation<T extends keyof Wordbook ? T : never>
>;

export const DEFAULT_LOCALE = 'ru';
