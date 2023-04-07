import { useMemo } from 'react';

import * as locales from './locales';
import { useLocaleSelector } from './intl';

import type { Wordbook } from './config';

/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {keyof} chapter ключ locale json
 *
 * @returns {function} функцию выбора значения из словаря
 * @example
 *
 * import { useTranslation } from 'shared/lib/intl';
 *
 * export const SomeComponent = () => {
 *   const translate = useTranslation('custom-chapter');
 *   return <ChildrenComponent label={translate('custom-text')} />
 * }
 */
export function useTranslation<T extends keyof Wordbook>(chapter: T) {
  const value = useLocaleSelector((state) => state.value);

  const translate = useMemo(() => {
    const wordbook: Wordbook = locales[value];
    return (key: keyof Wordbook[T]) => wordbook[chapter][key];
  }, [chapter, value]);

  return translate;
}
