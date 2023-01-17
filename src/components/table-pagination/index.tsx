import React from "react";
import "./style.scss";
// From MUI
import TablePagination from '@mui/material/TablePagination';

type PropsType = {
  count: number;
  limit: number;
  page: number;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PropsType> = (props) => {

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    props.setPage(newPage)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    props.setLimit(Number(event.target.value))
  };

  return (
    <div className="Table-pagination">
      <TablePagination
        component="div"
        count={props.count}
        page={props.page}
        onPageChange={handleChangePage}
        rowsPerPage={props.limit}
        rowsPerPageOptions={[1,5,10,25]}
        labelRowsPerPage={"Показывать"}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
        labelDisplayedRows={(paginationInfo) => {
          return `страница ${paginationInfo.page + 1} из ${paginationInfo.count/props.limit}`
        }}
      />
    </div>
  );
};

export default React.memo(Pagination);
// {from: 1, to: 5, count: 5, page: 0}