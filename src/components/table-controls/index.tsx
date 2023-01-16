import React, { ChangeEvent } from "react";
import "./style.scss";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

type PropsType = {
  searchValue?: string;
  // onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // clearSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TableControls: React.FC<PropsType> = (props) => {
  return (
    <div className="Table-controls">
      <div>
        Показывать <select name="perpage" id="page"></select>
      </div>
      <div>
        <TextField
          value={props.searchValue}
          onChange={props.onSearch}
          id="table-search"
          label="Поиск"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>
    </div>
  );
};

export default React.memo(TableControls);
