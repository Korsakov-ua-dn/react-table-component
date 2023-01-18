import React, { useCallback } from "react";
import "./style.scss";
// From MUI
import TablePagination from '@mui/material/TablePagination';
import { Key, Wordbook } from "../translate/use-translate";

type PropsType = {
  count: number;
  limit: number;
  page: number;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  t: (key: Key) => Wordbook;
};

const Pagination: React.FC<PropsType> = (props) => {

  const handleChangePage = useCallback((
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    props.setPage(newPage)
  }, [props.setPage]);

  const handleChangeRowsPerPage = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    props.setLimit(Number(event.target.value))
    props.setPage(0)
  }, [props.setPage, props.setLimit]);

  return (
    <div className="Table-pagination">
      <TablePagination
        component="div"
        count={props.count}
        page={props.page}
        onPageChange={handleChangePage}
        rowsPerPage={props.limit}
        rowsPerPageOptions={[1,5,10,25]}
        labelRowsPerPage={props.t("show")}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
        labelDisplayedRows={(paginationInfo) => {
          return `${props.t("page")} ${paginationInfo.page + 1} ${props.t("of")} ${Math.ceil(paginationInfo.count/props.limit)}`
        }}
      />
    </div>
  );
};

export default React.memo(Pagination);