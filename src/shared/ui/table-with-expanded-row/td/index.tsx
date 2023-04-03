import { typedMemo } from 'shared/hocs';

import WithTooltip from 'shared/ui/with-tooltip';

import './style.scss';

interface IProps<A> {
  width: number | undefined;
  value: A;
}

const Td = <A,>(props: IProps<A>) => {
  return (
    <td className="Table__body-item">
      <div style={props.width ? { maxWidth: `${props.width}px` } : {}}>
        <WithTooltip>{String(props.value)}</WithTooltip>
      </div>
    </td>
  );
};

export default typedMemo(Td);
