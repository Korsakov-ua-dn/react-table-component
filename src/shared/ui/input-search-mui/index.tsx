import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type Props = TextFieldProps;

const InputSearchMui: React.FC<Props> = (props) => {
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="standard"
      style={{ width: 120 }}
      {...props}
    />
  );
};

export default React.memo(InputSearchMui) as typeof InputSearchMui;
