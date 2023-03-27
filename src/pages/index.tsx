import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./main'));

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Main />} />
    </Routes>
  );
};
