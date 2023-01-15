import React from "react";
import numberFormat from "../../utils/number-format";
import "./style.css";

type PropsType = {
  data: { [key: string]: any };
  viewDataFormatScheme: DataFormatScheme;
  className?: string;
};

const TabelItem: React.FC<PropsType> = (props) => {
  let td = [];
  for (let key in props.data) {
    // Если схема не передана или в схеме не найден ключ рендерит строку
    switch (props.viewDataFormatScheme[key]) {
      case "price":
        td.push(<td key={key}>{numberFormat(props.data[key])} ₽</td>);
        break;

      case "date":
        const date = new Date(props.data[key]);
        td.push(
          <td key={key}>
            {date
              .toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(",", "")}
          </td>
        );
        break;

      case "number":
        td.push(<td key={key}>{numberFormat(props.data[key])}</td>);
        break;
        
      case "string":
        td.push(<td key={key}>{props.data[key]}</td>);
    }
  }

  return <tr className={`Table__item ${props.className}`}>{td}</tr>;
};

export default React.memo(TabelItem);

//types
export type DataFormatScheme = {
  [key: string]: "price" | "date" | "number" | "string";
}
