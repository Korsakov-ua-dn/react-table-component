import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../containers/main-layout';

import Main from './main';

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={''} element={<Main />} />
      </Routes>
    </MainLayout>
  );
};

export default React.memo(App) as typeof App;
