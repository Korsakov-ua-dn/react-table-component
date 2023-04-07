import compose from 'compose-function';

import { withRouter } from './with-router';
import { withStore } from './with-store';
import { withLocale } from './with-locale';

export const withProviders = compose(withRouter, withStore, withLocale);
