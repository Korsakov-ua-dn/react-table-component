import { useMemo } from 'react';

import * as locales from './locales';
import { useLocaleSelector } from './locale-context';

import type { Wordbook } from './config';

/**
 * Хук для доступа к функции перевода
 * В качестве параметра принимает главу словаря.
 * Возвращает функцию которая в качестве параметра принимает ключ конкретной главы словаря
 * и возвращает переведенное, в соответствии с текущим языком профиля, значение.
 *
 * @param {keyof} chapter один из ключей json словаря
 *
 * @returns {function} функцию выбора значения из json словаря
 * @example
 *
 * import { useTranslation } from 'shared/intl';
 *
 * export const SomeComponent = () => {
 *   const translate = useTranslation(chapter);
 *   return <ChildrenComponent label={translate('custom-text')} />
 * }
 */
export function useTranslation<T extends keyof Wordbook>(chapter: T) {
  const locale = useLocaleSelector();

  const translate = useMemo(() => {
    const wordbook: Wordbook = locales[locale];
    return (key: keyof Wordbook[T]) => wordbook[chapter][key];
  }, [chapter, locale]);

  return translate;
}
