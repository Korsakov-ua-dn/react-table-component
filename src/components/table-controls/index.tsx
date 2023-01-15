import React, { useMemo, MouseEvent, ChangeEvent, ForwardedRef } from "react";
import { Transaction } from "../../api";
import "./style.scss";

import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

type PropsType = {
  // onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  // onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
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
        {/* <Input id="table-search" label="Поиск" variant="standard" /> */}
        <TextField
        id="table-search"
        label="Поиск"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
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
