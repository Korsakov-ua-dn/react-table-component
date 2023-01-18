import en from "./locales/en.json";
import ru from "./locales/ru.json";

export default function useTranslation(locale: Locale)  {
    const wordbook = require(`./locales/${locale}.json`)
    return (key: Key): Wordbook => wordbook[key] ? wordbook[key] : key
}

// types
export type Locale = "en" | "ru";
export type Key = keyof typeof en | keyof typeof ru;
type ValueOf<T> = T[keyof T];
export type Wordbook = ValueOf<typeof en>;






// Пробовал разбить на отдельные главы (проблемы с типизацией)
// export default function useTranslation(locale: Locale)  {
//     const wordbook = require(`./locales/${locale}.json`)
//     // return wordbook[chapter]
//     return (key: keyof Wordbook) => wordbook[chapter][key] ? wordbook[chapter][key] : key
// }

// // types
// export type Locale = "en" | "ru";
// export type Chapter = keyof typeof en;

// type ValueOf<T> = T[keyof T];
// type Wordbook = ValueOf<typeof en>;