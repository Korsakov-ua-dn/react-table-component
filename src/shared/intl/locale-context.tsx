import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Locale } from './config';
import { LocaleStore } from './store';

function createLocaleContext() {
  const LocaleContext = createContext<LocaleStore | null>(null);

  const Provider = ({
    initialLocale,
    children,
  }: {
    initialLocale: Locale;
    children: React.ReactNode;
  }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const localeStore = useMemo(() => new LocaleStore(initialLocale), []);

    return (
      <LocaleContext.Provider value={localeStore}>
        {children}
      </LocaleContext.Provider>
    );
  };

  const useLocaleStore = () => {
    const localeStore = useContext(LocaleContext);
    if (!localeStore) {
      throw new Error('Can not use `useStore` outside of the `Provider`');
    }
    return localeStore;
  };

  const useLocaleSelector = () => {
    const localeStore = useLocaleStore();
    const [state, setState] = useState(() => localeStore.getLocale());

    useEffect(() => {
      return localeStore.subscribe(() => {
        const state = localeStore.getLocale();
        setState(state);
      });
    }, [localeStore]);

    return state;
  };

  const useSetLocale = () => {
    const localeStore = useLocaleStore();

    return localeStore.setLocale;
  };

  return { Provider, useLocaleSelector, useSetLocale };
}

export const { Provider, useLocaleSelector, useSetLocale } =
  createLocaleContext();
