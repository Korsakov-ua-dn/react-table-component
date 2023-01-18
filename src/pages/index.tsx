import React from "react";
import { Routes, Route } from "react-router-dom";
import Transactions from "../containers/transactions";
import Main from "./main";

const App = () => {
  return (
      <Routes>
        <Route path={""} element={<Transactions />} />
      </Routes>
  );
};

export default React.memo(App);
