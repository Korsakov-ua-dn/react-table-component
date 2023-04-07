import { Locale } from './config';

export class LocaleStore {
  private subscriptions: Set<() => void> = new Set<() => void>();
  private locale: Locale;
  constructor(initialValue: Locale) {
    this.locale = initialValue;
  }

  getLocale = () => {
    return this.locale;
  };

  setLocale = (locale: Locale) => {
    this.locale = locale;

    this.subscriptions.forEach((cb) => {
      cb();
    });
  };

  subscribe = (cb: () => void) => {
    this.subscriptions.add(cb);

    return () => {
      this.subscriptions.delete(cb);
    };
  };
}
