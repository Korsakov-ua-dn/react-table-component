import { useMemo } from 'react';

import { Locale, Wordbook } from './config';

import * as locales from './locales';

export function useTranslation<T extends keyof Wordbook>(
  chapter: T,
  locale: Locale
) {
  const translate = useMemo(() => {
    const wordbook: Wordbook = locales[locale];
    return (key: keyof Wordbook[T]) => wordbook[chapter][key];
  }, [chapter, locale]);

  return translate;
}
