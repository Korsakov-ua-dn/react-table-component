import { useState } from 'react';

import { Provider } from 'shared/intl';
import { isLocale } from 'shared/intl/lib';

export const withLocale = (component: () => React.ReactNode) => () => {
  const [locale] = useState(() => localStorage.getItem('locale'));
  return (
    <Provider initialState={{ value: isLocale(locale) ? locale : 'ru' }}>
      {component()}
    </Provider>
  );
};
