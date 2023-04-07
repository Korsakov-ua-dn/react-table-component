import { useMemo } from 'react';

import { Locale, Wordbook } from './config';

import * as locales from './locales';

/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {keyof} chapter ключ locale json
 * @param {keyof} locale текущий язык интерфейса
 *
 * @returns {function} функцию выбора значения из словаря
 * @example
 *
 * import { useTranslation } from 'shared/lib/intl';
 *
 * export const SomeComponent = () => {
 *   const translate = useTranslation(chapter, locale);
 *   return <ChildrenComponent label={translate('custom-text')} />
 * }
 */
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
