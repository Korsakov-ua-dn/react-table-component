import React from "react";
// From MUI
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface IProps {
  selectOptions: React.ReactElement[];
  value: string | number | symbol | undefined;
  onSelectFieldHandler: (e: SelectChangeEvent) => void;
  label: string;
};

const SearchField:React.FC<IProps> = (props) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="searc-select-label">{props.label}</InputLabel>
      <Select
        labelId="searc-select-label"
        id="searc-select"
        value={props.value ? String(props.value) : ""}
        onChange={props.onSelectFieldHandler}
      >
        {props.selectOptions}
      </Select>
    </FormControl>
  );
};

export default React.memo(SearchField) as typeof SearchField;
