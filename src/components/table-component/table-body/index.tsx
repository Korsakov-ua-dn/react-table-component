import React from "react";
import TabelBodyRow from "../table-body-row";
import { v1 } from "uuid";
import { ExpandingContentComponent, ViewDataFormatScheme } from "../types";
import "./style.scss";

type PropsType<T> = {
  items: T[];
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  expandingContentComponent: ExpandingContentComponent;
};

const TableBody = <T extends object>(props: PropsType<T>): JSX.Element => {
  const tbody = props.items.map((row, i) => {
    const id = v1();
    return (
      <TabelBodyRow
        key={id}
        row={row}
        painted={i % 2 === 0} // покрасить зеброй
        viewDataFormatScheme={props.viewDataFormatScheme}
        expandingContentComponent={props.expandingContentComponent}
      />
    );
  });

  return <>{tbody}</>;
};

export default React.memo(TableBody) as typeof TableBody;
