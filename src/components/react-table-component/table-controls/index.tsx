import React, { ChangeEvent, useCallback, useState } from "react";
import { Key, Wordbook } from "../translate/use-translate";
import "./style.scss";
// From MUI
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { ViewDataFormatScheme } from "..";

type PropsType<T> = {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  search: any;
  onSearch: (value: string) => void;
  onSelectField: (e: SelectChangeEvent) => void;
  onPrintPdf: () => void;
  onDownloadXls: () => void;
  t: (key: Key) => Wordbook;
};

const TableControls = <T, F extends keyof T>(props: PropsType<T>): JSX.Element => {
  
  const [error, setError] = useState(false);

  const callbacks = {
    onSelectFieldHandler: useCallback((e: SelectChangeEvent, ) => {
      props.onSelectField(e);
      setError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onSelectField]),

    onSearchHandler: useCallback(( e: ChangeEvent<HTMLInputElement>) => {
      if (!props.search) {
        setError(true);
      } else {
        setError(false);
        props.onSearch(e.target.value);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onSearch, props.search]),
  }

  return (
    <div className="Table-controls">
      <div className="Table-controls__print-wrapper">
        <button className="Table-controls__btn-print Table-controls__btn-print_pdf" onClick={props.onPrintPdf}></button>
        <button className="Table-controls__btn-print Table-controls__btn-print_xls" onClick={props.onDownloadXls}></button>
      </div>

      <div className="Table-controls__search">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">{props.t("field")}</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.search ? props.search.field : ""}
            onChange={callbacks.onSelectFieldHandler}
            label="Поле"
          >
            {Object.entries(props.viewDataFormatScheme).map((field) => (
              <MenuItem key={field[0]} value={field[0]}>
                {/* @ts-ignore */}
                <em className="Table-controls-selec-field-option">{field[1].title}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          value={props.search ? props.search.value : ""}
          onChange={callbacks.onSearchHandler}
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

export default React.memo(TableControls) as typeof TableControls;
