import React from "react";
import { Format, formatDataToView } from "../../utils/format-data-to-view";
import "./style.scss";

type PropsType = {
  data: { [key: string]: any };
  viewDataFormatScheme: DataFormatScheme;
  className?: string;
};

const TabelItem: React.FC<PropsType> = (props) => {
  let td = [];

  for (let key in props.data) {
    // Узнаю какого формата текущее поле согласно схемы
    const format = props.viewDataFormatScheme[key]?.format;
    // Если в схеме отсутствует поле с таким ключем => рендер не производится
    if (format !== undefined) {
      const renderFunction = formatDataToView[format];
      td.push(<td key={key}>{renderFunction(props.data[key])}</td>);
    }
  }

  return <tr className={`Table__item ${props.className}`}>{td}</tr>;
};

export default React.memo(TabelItem);

//types
type Data = {
  format: Format;
  title: string;
  sort: boolean;
}
export type DataFormatScheme = Record<string, Data>;