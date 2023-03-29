import React from 'react';
import TablePagination, {
  TablePaginationProps,
} from '@mui/material/TablePagination';

type PropsType = TablePaginationProps;

const TablePaginationMui: React.FC<PropsType> = (props): JSX.Element => {
  const style = {
    MenuProps: {
      sx: {
        '.MuiTablePagination-menuItem.Mui-selected': {
          backgroundColor: 'var(--color_active)!important',
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <TablePagination
      component="div"
      showFirstButton
      showLastButton
      SelectProps={style}
      {...props}
    />
  );
};

export default React.memo(TablePaginationMui) as typeof TablePaginationMui;
