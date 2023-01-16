import React, { MouseEvent } from "react";
import { DataFormatScheme } from "../table-item";
import "./style.scss";

type PropsType = {
  viewDataFormatScheme: DataFormatScheme;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
};

const TabelHeader: React.FC<PropsType> = (props) => {
  const arrow = require("../../assets/images/arrow-sort.svg").default;

  let th = [];

  for (let key in props.viewDataFormatScheme) {
    th.push(
      <th
        key={key}
        onClick={props.onSort}
        data-field={key}
        data-format={props.viewDataFormatScheme[key].format}
      >
        <div>
          <img src={arrow} alt="sort" />
          {props.viewDataFormatScheme[key].title}
        </div>
      </th>
    );
  }

  return <tr>{th}</tr>;
};

export default React.memo(TabelHeader);