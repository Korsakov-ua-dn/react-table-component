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
  direction: Direction;
  onSort: null | ((field: keyof T) => void);
};

const TableHeadItem = <T,>(props: PropsType<T>): JSX.Element => {
  const onSortHandler = useCallback(() => {
    props.onSort && props.onSort(props.value);
  }, [props]);

  const classN = `
    Table__header-item 
    ${props.isActiveField ? "Table__header-item_active" : ""}
  `;

  const style = props.width
    ? { maxWidth: `${props.width}px`, minWidth: `${props.width}px` }
    : {};

  return (
    <th
      onClick={props.isSort ? onSortHandler : () => {}}
      className={classN}
      style={style}
    >
      <WithTooltip>
        <div>
          {props.viewDataFormatScheme[props.value]?.title}
          {props.isSort && props.onSort && (
            <img
              className="Direction-arrow"
              data-direction={props.direction}
              src={arrow}
              alt="sort arrow"
            />
          )}
        </div>
      </WithTooltip>
    </th>
  );
};

export default React.memo(TableHeadItem) as typeof TableHeadItem;
