import React, { useCallback, useState } from "react";
import { Format, formatDataToView } from "../utils/format-data-to-view";
import "./style.scss";
// From MUI
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type PropsType = {
  row: { [key: string]: any };
  viewDataFormatScheme: DataFormatScheme;
  painted: boolean;
  expandingContentComponent: ExpandingContentComponent;
};

const TabelRow: React.FC<PropsType> = (props) => {
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
        <td colSpan={Object.keys(props.row).length}>
          <div className="Expanding-content__Detailed-information">
            { props.expandingContentComponent(props.row) }
          </div>
        </td>
      </tr>}
    </>
  );
};

export default React.memo(TabelRow);

//types
export type Data = {
  format: Format;
  title: string;
  sort: boolean;
};
export type DataFormatScheme = Record<string, Data>;
export type Row = { [key: string]: any }
export type ExpandingContentComponent = (info: Row) => React.ReactElement;
