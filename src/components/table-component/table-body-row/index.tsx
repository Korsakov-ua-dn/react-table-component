import React, { useCallback, useState } from "react";
import WithTooltip from "../with-tooltip";
import { ExpandingContentComponent, ViewDataFormatScheme } from "../types";
import "./style.scss";
// From MUI
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type PropsType<T> = {
  row: T;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  painted: boolean;
  expandingContentComponent: ExpandingContentComponent;
};

const TabelBodyRow = <T extends object>(props: PropsType<T>): JSX.Element => {
  // Состояние строки "развернутая" и "свернутая"
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const expandRowHandler = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const ClassNameRow = `
    Table__body-row 
    ${isExpanded ? "Table__body-row_expanded" : ""}
    ${props.painted ? "Table__body-row_painted" : ""}
  `;

  let td = [
    <td
      className="Table__body-item_expand"
      key={"arrow"}
      onClick={expandRowHandler}
    >
      <ArrowRightIcon />
    </td>, // Первый элемент каждой строки - стрелка для разворачивания детальной информации
  ];

  for (let key in props.viewDataFormatScheme) {
    const width = props.viewDataFormatScheme[key]?.width;
    const renderFunction = props.viewDataFormatScheme[key]?.renderFunction!;
    const value = renderFunction(props.row[key]);

    td.push(
      <td
        key={key}
        className="Table__body-item"
        style={width ? { maxWidth: `${width}px`, minWidth: `${width}px` } : {}}
      >
        <WithTooltip>
          {value}
        </WithTooltip>
      </td>
    );
  }

  return (
    <>
      <tr className={ClassNameRow}>{td}</tr>
      {isExpanded && (
        <tr className={"Expanding-content"}>
          <td colSpan={Object.keys(props.row).length}>
            <div className="Expanding-content__Detailed-information">
              {props.expandingContentComponent(props.row)}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default React.memo(TabelBodyRow) as typeof TabelBodyRow;
