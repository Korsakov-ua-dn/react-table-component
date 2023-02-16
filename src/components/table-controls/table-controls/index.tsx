import React from "react";
import "./style.scss";

type PropsType = {
  children: React.ReactNode | React.ReactNode[];
};

const TableControls:React.FC<PropsType> = (props) => {
  return (
    <div className="Table-controls">
      {props.children}
    </div>
  );
};

export default React.memo(TableControls) as typeof TableControls;
