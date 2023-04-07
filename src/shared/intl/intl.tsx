import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Locale } from './config';

class LocaleStore<T> {
  private subscriptions: Set<() => void> = new Set<() => void>();
  private state: T;
  constructor(initialState: T) {
    this.state = initialState;
  }

  getState = () => {
    return this.state;
  };

  update = (partialNewState: Partial<T>) => {
    this.state = { ...this.state, ...partialNewState };

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

function createOptimizedContext<T>() {
  const Context = createContext<LocaleStore<T> | null>(null);

  const Provider = ({
    initialState,
    children,
  }: {
    initialState: T;
    children: React.ReactNode;
  }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const store = useMemo(() => new LocaleStore(initialState), []);

    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  const useStore = () => {
    const store = useContext(Context);
    if (!store) {
      throw new Error('Can not use `useStore` outside of the `Provider`');
    }
    return store;
  };

  const useLocaleSelector = <Result,>(
    selector: (state: T) => Result
  ): Result => {
    const store = useStore();
    const [state, setState] = useState(() => selector(store.getState()));
    const selectorRef = useRef(selector);
    const stateRef = useRef(state);

    useLayoutEffect(() => {
      selectorRef.current = selector;
      stateRef.current = state;
    });

    useEffect(() => {
      return store.subscribe(() => {
        const state = selectorRef.current(store.getState());

        if (stateRef.current === state) {
          return;
        }

        setState(state);
      });
    }, [store]);

    return state;
  };

  const useUpdate = () => {
    const store = useStore();

    return store.update;
  };

  return { Provider, useLocaleSelector, useUpdate };
}

interface LocaleContextData {
  value: Locale;
}

export const { Provider, useLocaleSelector, useUpdate } =
  createOptimizedContext<LocaleContextData>();
