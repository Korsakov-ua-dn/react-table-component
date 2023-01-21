import React, { useCallback, useState } from "react";
import { formatDataToView } from "../utils/format-data-to-view";
import { ViewDataFormatScheme } from "..";
import "./style.scss";
// From MUI
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type PropsType<T> = {
  row: Row<T>;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  painted: boolean;
  expandingContentComponent: ExpandingContentComponent;
};
export type Row<T> = T
export type ExpandingContentComponent = <T>(info: Row<T>) => React.ReactElement;

const TabelRow = <T,>(props: PropsType<T>): JSX.Element => {
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
    <td className="Table__body-item_expand" key={"arrow"} onClick={expandRowHandler}>
      <ArrowRightIcon />
    </td> // Первый элемент каждой строки - стрелка для разворачивания детальной информации
  ];

  for (let key in props.viewDataFormatScheme) {
    //@ts-ignore
    const format = props.viewDataFormatScheme[key].format;
    const renderFunction = formatDataToView[format];
    
    td.push(
      <td className="Table__body-item" key={key}>
        {renderFunction(props.row[key])}
      </td>
    );
  }

  return (
    <>
      <tr className={ClassNameRow}>
        {td}
      </tr>
      { isExpanded && <tr className={"Expanding-content"}>
        {/* @ts-ignore */}
        <td colSpan={Object.keys(props.row).length}>
          <div className="Expanding-content__Detailed-information">
            { props.expandingContentComponent(props.row) }
          </div>
        </td>
      </tr>}
    </>
  );
};

export default React.memo(TabelRow) as typeof TabelRow;

//types
export type Format = "price" | "date" | "number" | "string";
export type Data = {
  format: Format;
  title: string;
  sort: boolean;
};
// export type DataFormatScheme = Record<string, Data>;
// export type Row = { [key: string]: any }
// export type ExpandingContentComponent = (info: Row) => React.ReactElement;
