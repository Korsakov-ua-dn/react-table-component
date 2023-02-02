import React, { ChangeEvent, useCallback, useState, useMemo } from "react";
import { ViewDataFormatScheme } from "../../table-component/types";
import { Translate } from "../../../utils/translate/use-translate";
import SearchField from "./search-field";
import "./style.scss";
// From MUI
import SearchInput from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type PropsType<T> = {
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  search: { field: keyof T; value: string } | null;
  onSearch: (value: string) => void;
  onSelectField: (e: SelectChangeEvent) => void;
  translate: Translate;
};

const SearchPanel = <T,>(props: PropsType<T>): JSX.Element => {
  const [error, setError] = useState(false);

  const callbacks = {
    onSelectFieldHandler: useCallback(
      (e: SelectChangeEvent) => {
        props.onSelectField(e);
        setError(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onSelectField]),

    onSearchHandler: useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!props.search) {
          setError(true);
        } else {
          setError(false);
          props.onSearch(e.target.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onSearch, props.search]),
  };

  const selectOptions = useMemo(() => {
    let menuItems = [];

    for (let key in props.viewDataFormatScheme) {
      menuItems.push(
        <MenuItem key={key} value={key}>
          <em className="Search__field-option">
            {props.viewDataFormatScheme[key]?.title}
          </em>
        </MenuItem>
      );
    }
    return menuItems;
  }, [props.viewDataFormatScheme]);

  return (
    <div className="Search">
      <SearchField
        label={props.translate("field")}
        value={props.search?.field}
        selectOptions={selectOptions}
        onSelectFieldHandler={callbacks.onSelectFieldHandler}
      />

      <SearchInput
        value={props.search ? props.search.value : ""}
        onChange={callbacks.onSearchHandler}
        id="search-input"
        label={props.translate("search")}
        helperText={error ? props.translate("search-error") : " "}
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
  );
};

export default React.memo(SearchPanel) as typeof SearchPanel;
