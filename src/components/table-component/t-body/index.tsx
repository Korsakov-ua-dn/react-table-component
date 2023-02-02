import React from "react";
import TbodyRow from "../t-body-row";
import { v1 } from "uuid";
import { ExpandedContentComponent, ViewDataFormatScheme } from "../types";
import "./style.scss";

type PropsType<T> = {
  items: T[];
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  getExpandedContentComponent: ExpandedContentComponent;
};

const Tbody = <T extends object>(props: PropsType<T>): JSX.Element => {
  const tbody = props.items.map((row, i) => {
    const id = v1();
    return (
      <TbodyRow
        key={id}
        row={row}
        painted={i % 2 === 0} // покрасить зеброй
        viewDataFormatScheme={props.viewDataFormatScheme}
        getExpandedContentComponent={props.getExpandedContentComponent}
      />
    );
  });

  return <tbody>{tbody}</tbody>;
};

export default React.memo(Tbody) as typeof Tbody;
