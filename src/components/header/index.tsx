import React, { useCallback } from "react";
import "./style.scss";
import { Locale } from "../../utils/translate/use-translate";
// From MUI
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type PropsType = {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};

const Header: React.FC<PropsType> = (props) => {

  const changeLocaleHandler = useCallback((event: SelectChangeEvent) => {
    props.changeLocale(event.target.value as Locale);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeLocale]);

  return (
    <header className="Header">

      <FormControl sx={{ m: 0 }} size="small">
        <Select
          value={props.locale}
          onChange={changeLocaleHandler}
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={props.locale}
        >
          <MenuItem value={"ru"}>Ru</MenuItem>
          <MenuItem value={"en"}>En</MenuItem>
        </Select>
      </FormControl>

    </header>
  );
};

export default React.memo(Header);
