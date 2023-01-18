import React, { ChangeEvent, useCallback, useState } from "react";
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
import { Key, Wordbook } from "../translate/use-translate";

type PropsType = {
  viewDataFormatScheme: DataFormatScheme;
  search: any;
  onSearch: (value: string) => void;
  onSelectField: (e: SelectChangeEvent) => void;
  t: (key: Key) => Wordbook;
};

const TableControls: React.FC<PropsType> = (props) => {

  const [error, setError] = useState(false);

  const onSelectFieldHandler = useCallback((
    event: SelectChangeEvent,
  ) => {
    props.onSelectField(event);
    setError(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onSelectField]);

  const onSearchHandler = useCallback((
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!props.search) {
      setError(true);
    } else {
      setError(false);
      props.onSearch(event.target.value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onSearch, props.search]);

  return (
    <div className="Table-controls">
      <div>
        <button>PDF</button>
        <button>XLS</button>
      </div>

      <div className="Table-controls__search">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">{props.t("field")}</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.search ? props.search.field : ""}
            onChange={onSelectFieldHandler}
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
          onChange={onSearchHandler}
          id="table-search"
          label={props.t("search")}
          helperText={error ? props.t("search-error") : " "}
          error={error}
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
