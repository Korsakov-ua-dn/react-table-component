import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const TransactionAnalytics = lazy(() => import('./transaction-analytics'));

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TransactionAnalytics />} />
    </Routes>
  );
};
