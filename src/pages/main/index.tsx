import React, { useEffect } from "react";
import Layout from "../../components/layout";
import Transactions from "../../containers/transactions";
import { useAppDispatch } from "../../hooks";
import { fetchAllTransactions } from "../../store/transaction-slice";

const Main:React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions())
  }, [dispatch])

  return (
    <Layout>
      <Transactions/>
    </Layout>
  );
};

export default React.memo(Main);
