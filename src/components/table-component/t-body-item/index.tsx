import React from "react";
import WithTooltip from "../with-tooltip";
import "./style.scss";

interface IProps {
  width: number | undefined;
  value: string | number;
};

const TbodyItem:React.FC<IProps> = (props) => {
  return (
    <td className="Table__body-item">
      <div style={props.width ? { maxWidth: `${props.width}px` } : {}}>
        <WithTooltip>
          {props.value}
        </WithTooltip>
      </div>
    </td>
  );
};

export default React.memo(TbodyItem) as typeof TbodyItem;
