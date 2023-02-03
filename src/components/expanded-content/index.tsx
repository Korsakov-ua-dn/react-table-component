import React from "react";
import "./style.scss";

type PropsType = {
  info: any;
};

const ExpandedContent: React.FC<PropsType> = (props) => {
  return (
    <div className="Transaction-detail-info">
      <span>Детальная информация о транзакции <b>id: {props.info._id}</b></span>
      <span>Дата платежа: {props.info.date}</span>
    </div>
  );
};

export default React.memo(ExpandedContent) as typeof ExpandedContent;