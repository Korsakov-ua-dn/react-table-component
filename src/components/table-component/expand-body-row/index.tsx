import React, { useCallback, useState } from "react";
import { ExpandedContentComponent, ViewDataFormatScheme } from "../types";
import TbodyItem from "../t-body-item";
import "./style.scss";
// From MUI
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type PropsType<T> = {
  row: T;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  painted: boolean;
  expandingContentComponent: ExpandedContentComponent;
};

const TbodyRow = <T extends object>(props: PropsType<T>): JSX.Element => {
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

  // Первый элемент каждой строки - стрелка для разворачивания детальной информации
  let td = [
    <td
      className="Table__body-item_expand"
      key={"arrow"}
      onClick={expandRowHandler}
    >
      <ArrowRightIcon />
    </td>
  ];

  for (let key in props.viewDataFormatScheme) {
    const width = props.viewDataFormatScheme[key]?.width;
    const renderFunction = props.viewDataFormatScheme[key]?.renderFunction!;
    const value = renderFunction(props.row[key]);

    td.push(<TbodyItem key={key} width={width} value={value}/>);
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

export default React.memo(TbodyRow) as typeof TbodyRow;
