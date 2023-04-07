import { useSyncExternalStore } from 'react';

import {
  DEFAULT_LOCALE,
  Provider,
  getSnapshot,
  isLocale,
  subscribe,
} from 'shared/intl';

export const withLocale = (component: () => React.ReactNode) => () => {
  const locale = useSyncExternalStore(subscribe, getSnapshot);
  return (
    <Provider initialLocale={isLocale(locale) ? locale : DEFAULT_LOCALE}>
      {component()}
    </Provider>
  );
};
