import React from 'react';
import TablePagination, {
  TablePaginationProps,
} from '@mui/material/TablePagination';

type PropsType = TablePaginationProps & {
  count: number;
  page: number;
  onPageChange: (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  rowsPerPage: number;
};

const Pagination: React.FC<PropsType> = ({
  count,
  page,
  onPageChange,
  rowsPerPage,
  ...restprops
}): JSX.Element => {
  const style = {
    MenuProps: {
      sx: {
        '.MuiTablePagination-menuItem.Mui-selected': {
          backgroundColor: 'var(--color-active)!important',
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      showFirstButton
      showLastButton
      SelectProps={style}
      {...restprops}
    />
  );
};

export default React.memo(Pagination) as typeof Pagination;
