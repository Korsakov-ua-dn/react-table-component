// import en from './locales/en.json';
// import ru from './locales/ru.json';
import * as locales from './locales';

export function useTranslation<T extends keyof Wordbook>(
  chapter: T,
  locale: Locale
) {
  // const wordbook: Wordbook = require(`./locales/${locale}.json`);
  // eslint-disable-next-line import/namespace
  const wordbook: Wordbook = locales[locale];

  // let wordbook: Wordbook;
  // if (locale === 'en') {
  //   wordbook = en;
  // } else {
  //   wordbook = ru;
  // }

  return (key: keyof Wordbook[T]) => wordbook[chapter][key];
}

// types
export type Locale = 'en' | 'ru';

// type Wordbook = typeof ru | typeof en;

export type Translate = ReturnType<typeof useTranslation>;

type ValueOf<T> = T[keyof T];
type Wordbook = ValueOf<typeof locales>;
