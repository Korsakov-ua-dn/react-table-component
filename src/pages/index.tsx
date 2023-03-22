import { Route, Routes } from 'react-router-dom';

import { Header } from '../modules/header';

import { Main } from './main';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={''} element={<Main />} />
      </Routes>
    </>
  );
};
