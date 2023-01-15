import React, { useMemo, MouseEvent, ChangeEvent, ForwardedRef } from "react";
import { Transaction } from "../../api";
import "./style.scss";

type PropsType = {
  headerOptions: HeaderOption[];
  items: Transaction[];
  colorScheme: ColorScheme;
  // sort: SortType;
  // search: SearchType;
  renderItem: (item: any) => React.ReactElement<HTMLTableRowElement>;
  // onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  // onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // clearSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Table = React.forwardRef(
  (props: PropsType, ref: ForwardedRef<HTMLTableElement | null>) => {
    const classN = `Table ${
      props.colorScheme === "zebra" ? "Table_zebra" : ""
    }`;
    const arrow = require("../../assets/images/arrow-sort.svg").default;

    return (
      <div className={classN}>
        <table ref={ref} id="table">
          <thead>
            <tr>
              {props.headerOptions.map((option) => (
                <th key={option.title}>
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
);

export default React.memo(Table);

type ColorScheme = "mono" | "zebra";

type HeaderOption = {
  title: string;
  sort: boolean;
};
