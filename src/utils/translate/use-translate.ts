import { useMemo } from 'react';

import * as locales from './locales';

export function useTranslation<T extends keyof Wordbook>(
  chapter: T,
  locale: Locale
) {
  const memoTranslateFn = useMemo(() => {
    const wordbook: Wordbook = locales[locale];
    return (key: keyof Wordbook[T]) => wordbook[chapter][key];
  }, [chapter, locale]);

  return memoTranslateFn;
}

// types
type ValueOf<T> = T[keyof T];
type Wordbook = ValueOf<typeof locales>;
export type Locale = keyof typeof locales;
export type Translate<T> = ReturnType<
  typeof useTranslation<T extends keyof Wordbook ? T : never>
>;
