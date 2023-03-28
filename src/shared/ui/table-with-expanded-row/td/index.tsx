import React from 'react';

import WithTooltip from 'shared/ui/with-tooltip';

import './style.scss';

interface IProps {
  width: number | undefined;
  value: string | number;
}

const Td: React.FC<IProps> = (props) => {
  return (
    <td className="Table__body-item">
      <div style={props.width ? { maxWidth: `${props.width}px` } : {}}>
        <WithTooltip>{props.value}</WithTooltip>
      </div>
    </td>
  );
};

export default React.memo(Td) as typeof Td;
