import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AppDispatch, RootState } from '../store';

import type { TypedUseSelectorHook } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQueryParameter = (name: string) => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  return query.get(name);
};
