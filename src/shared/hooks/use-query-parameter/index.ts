import { useLocation } from 'react-router-dom';

export const useQueryParameter = (name: string) => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  return query.get(name);
};
