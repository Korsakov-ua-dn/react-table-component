import React, { useCallback } from "react";
import { Direction, ViewDataFormatScheme } from "../types";
import WithTooltip from "../with-tooltip";
import "./style.scss";
const arrow = require("../assets/images/arrow-sort.svg").default;

type PropsType<T> = {
  value: Partial<keyof T>;
  isSort: boolean;
  width: number | undefined;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  isActiveField: boolean;
  direction?: Direction;
  onSort?: (field: keyof T) => void;
};

const TheadItem = <T,>(props: PropsType<T>): JSX.Element => {
  const onSortHandler = useCallback(() => {
    props.onSort && props.onSort(props.value);
  }, [props]);

  const classN = `
    Table__head-item 
    ${props.isActiveField ? "Table__head-item_active" : ""}
  `;

  const style = props.width ? { maxWidth: `${props.width}px` } : {};

  return (
    <th onClick={props.isSort ? onSortHandler : () => {}} className={classN}>
      <div style={style}>
        <WithTooltip>
          {props.viewDataFormatScheme[props.value]?.title!}
        </WithTooltip>

        {/* {props.isSort && props.onSort && ( */}
          <img
            className="Direction-arrow"
            data-direction={props.direction}
            src={arrow}
            alt="sort arrow"
          />
        {/* )} */}
      </div>
    </th>
  );
};

export default React.memo(TheadItem) as typeof TheadItem;
