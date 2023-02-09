import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../containers/main-layout";
import Main from "./main";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={""} element={<Main />} />
      </Routes>
    </MainLayout>
  );
};

export default React.memo(App);
