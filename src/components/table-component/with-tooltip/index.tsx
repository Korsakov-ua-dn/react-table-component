import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
// From MUI
import Tooltip from "@mui/material/Tooltip";

interface IProps {
  children: string | number;
};

const WithTooltip = (props: IProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isTooltip, setTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (
      ref.current?.scrollWidth! > ref.current?.offsetWidth! ||
      ref.current?.scrollHeight! > ref.current?.offsetHeight!
    ) {
      setTooltip(true);
    }
  }, []);

  if (isTooltip) {
    return (
      <Tooltip placement="top" title={props.children}>
        <span className="With-tooltip__text" ref={ref}>
          {props.children}
        </span>
      </Tooltip>
    );
  }

  return (
    <span className="With-tooltip__text" ref={ref}>
      {props.children}
    </span>
  );
};

export default React.memo(WithTooltip) as typeof WithTooltip;
