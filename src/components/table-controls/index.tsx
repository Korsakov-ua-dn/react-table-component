import React, { ChangeEvent } from "react";
import "./style.scss";
// From MUI
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DataFormatScheme } from "../table-item";

type PropsType = {
  viewDataFormatScheme: DataFormatScheme;
  search: any;
  // onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // clearSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectField: (e: SelectChangeEvent) => void;
};

const TableControls: React.FC<PropsType> = (props) => {
  return (
    <div className="Table-controls">
      <div>
        Показывать <select name="perpage" id="page"></select>
      </div>

      <div className="Table-controls__search">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Поле</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.search ? props.search.field : ""}
            onChange={props.onSelectField}
            label="Поле"
          >
            {Object.entries(props.viewDataFormatScheme).map((field) => (
              <MenuItem key={field[0]} value={field[0]}>
                <em className="Table-controls-selec-field-option">{field[1].title}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          value={props.search ? props.search.value : ""}
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
