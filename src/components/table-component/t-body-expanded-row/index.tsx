import React from "react";
import { ExpandedContentComponent } from "../table.types";
import "./style.scss";

type PropsType<T> = {
  row: T;
  getExpandedContentComponent: ExpandedContentComponent;
};

const TbodyExpandedRow = <T extends object>(props: PropsType<T>): JSX.Element => {
  return (
    <tr className={"Expanding-content"}>
      <td colSpan={Object.keys(props.row).length}>
        <div className="Expanding-content__Detailed-information">
          {props.getExpandedContentComponent(props.row)}
        </div>
      </td>
    </tr>
  );
};

export default React.memo(TbodyExpandedRow) as typeof TbodyExpandedRow;
