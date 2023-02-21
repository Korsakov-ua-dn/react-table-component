import React from "react";
import "./style.scss";
import { Locale } from "../../utils/translate/use-translate";
// From MUI
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
  locale: Locale;
  changeLocale: (event: SelectChangeEvent) => void;
};

const Header: React.FC<IProps> = ({
  locale,
  changeLocale,
}) => {

  return (
    <header className="Header">

      <FormControl sx={{ m: 0 }} size="small">
        <Select
          value={locale}
          onChange={changeLocale}
        >
          <MenuItem value={"ru"}>Ru</MenuItem>
          <MenuItem value={"en"}>En</MenuItem>
        </Select>
      </FormControl>

    </header>
  );
};

export default React.memo(Header);
