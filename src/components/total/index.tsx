import React from "react";
import Layout from "../layout";
import "./style.css";
import CustomButton from "../button"

type PropsType = {
  totalVolume: number;
  totalQty: number;
  openDialog: () => void;
};

const Total: React.FC<PropsType> = (props) => (
  <div className="Total">
    <Layout>
      <div className="Table Total__wrapper">
        <span className="Total__item">Общий обьем: {props.totalVolume}</span>
        <span className="Total__item">Общее количество: {props.totalQty}</span>
        <span className="Total__item">
          <CustomButton disabled={!props.totalVolume && !props.totalQty} onClick={props.openDialog}>
            Аннулировать
          </CustomButton>
        </span>
      </div>
    </Layout>
  </div>
);

export default React.memo(Total);
