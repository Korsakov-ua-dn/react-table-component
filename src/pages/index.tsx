import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../containers/main-layout";
import Transactions from "./transactions";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={""} element={<Transactions />} />
      </Routes>
    </MainLayout>
  );
};

export default React.memo(App);
