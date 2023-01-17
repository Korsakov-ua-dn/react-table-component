
export default function useTranslation(chapter: any, locale: string){
    const wordbook = require(`../locales/${locale}.json`)
    return (key: string) => wordbook[chapter][key]
}
