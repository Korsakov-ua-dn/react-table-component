import { memo, useEffect, useRef, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

import './style.scss';

interface IProps {
  children: string | number;
}

const WithTooltip = (props: IProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isTooltip, setTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (
      (ref.current && ref.current.scrollWidth > ref.current.offsetWidth) ||
      (ref.current && ref.current.scrollHeight > ref.current.offsetHeight)
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

export default memo(WithTooltip) as typeof WithTooltip;
