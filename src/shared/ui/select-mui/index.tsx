import React from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { v1 } from 'uuid';

type Props = SelectProps & {
  label: string;
};

const SelectMUI: React.FC<Props> = ({ label, ...restprops }) => {
  const id = v1();
  const style = {
    sx: {
      '.Mui-selected': {
        backgroundColor: 'var(--color_active)!important',
        color: '#ffffff',
      },
    },
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select MenuProps={style} labelId={id} {...restprops} />
    </FormControl>
  );
};

export default React.memo(SelectMUI) as typeof SelectMUI;
