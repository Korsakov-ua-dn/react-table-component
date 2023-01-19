import React from "react";
import { Row } from "../react-table-component/table-row";
import "./style.scss";

type PropsType = {
  info: Row;
};

const ExpandingContent: React.FC<PropsType> = (props) => {
  return (
    <div className="Transaction-detail-info">
      <span>Детальная информация о транзакции <b>id: {props.info._id}</b></span>
      <span>Дата платежа: {props.info.date}</span>
    </div>
  );
};

export default React.memo(ExpandingContent);
