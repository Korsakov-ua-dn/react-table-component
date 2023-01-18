import React, { useCallback, useState } from "react";
import { Format, formatDataToView } from "../utils/format-data-to-view";
import "./style.scss";
// From MUI
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type PropsType = {
  data: { [key: string]: any };
  viewDataFormatScheme: DataFormatScheme;
  painted: boolean;
};

const TabelItem: React.FC<PropsType> = (props) => {
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
    </td>
  ];

  for (let key in props.data) {
    // Узнаю какого формата текущее поле согласно схемы
    const format = props.viewDataFormatScheme[key]?.format;
    // Если в схеме отсутствует поле с таким ключем => рендер не производится
    if (format !== undefined) {
      const renderFunction = formatDataToView[format];
      td.push(
        <td className="Table__body-item" key={key}>
          {renderFunction(props.data[key])}
        </td>
      );
    }
  }

  return (
    <>
      <tr className={ClassNameRow}>
        {td}
      </tr>
      { isExpanded && <tr className={"Expanding-content"}>
        <td colSpan={Object.keys(props.data).length}>
          <span className=""> Детальная информация о транзакции </span>
        </td>
      </tr>}
    </>
  );
};

export default React.memo(TabelItem);

//types
type Data = {
  format: Format;
  title: string;
  sort: boolean;
};
export type DataFormatScheme = Record<string, Data>;
