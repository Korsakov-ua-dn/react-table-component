import React, { MouseEvent } from "react";
import "./style.scss";

type PropsType = {
  // headerOptions: HeaderOption[];
  items: any[];
  colorScheme: ColorScheme;
  // sort: SortType;
  // search: SearchType;
  renderItem: (item: any) => React.ReactElement<HTMLTableRowElement>;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  // onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // clearSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Table<T>(props: {
  headerOptions: any[];
  items: T[];
  colorScheme: ColorScheme;
  renderItem: (item: any) => React.ReactElement<HTMLTableRowElement>;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
}) {
  const classN = `Table ${props.colorScheme === "zebra" ? "Table_zebra" : ""}`;
  const arrow = require("../../assets/images/arrow-sort.svg").default;

  return (
    <div className={classN}>
      <table id="table">
        <thead>
          <tr>
            {props.headerOptions.map((option) => (
              <th
                key={option.title}
                onClick={props.onSort}
                data-field={option.field}
                data-format={option.format}
              >
                <div>
                  <img src={arrow} alt="sort" />
                  {option.title}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{props.items.map((item) => props.renderItem(item))}</tbody>
      </table>
    </div>
  );
}

export default React.memo(Table);

//types
export type ColorScheme = "mono" | "zebra";
