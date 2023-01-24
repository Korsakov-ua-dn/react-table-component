import React, { useCallback } from "react";
import "./style.scss";
// From MUI
import TablePagination from '@mui/material/TablePagination';
import { Translate } from "../translate/use-translate";

type PropsType = {
  count: number;
  limit: number;
  page: number;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  t: Translate;
};

const Pagination: React.FC<PropsType> = (props) => {

  const callbacks = {
    handleChangePage: useCallback((
      e: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      props.setPage(newPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.setPage]),

    handleChangeRowsPerPage: useCallback((
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      props.setLimit(Number(e.target.value))
      props.setPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.setPage, props.setLimit]),
  };

  return (
    <div className="Table-pagination">
      <TablePagination
        component="div"
        count={props.count}
        page={props.page}
        onPageChange={callbacks.handleChangePage}
        rowsPerPage={props.limit}
        rowsPerPageOptions={[5,10,25]}
        labelRowsPerPage={props.t("show")}
        onRowsPerPageChange={callbacks.handleChangeRowsPerPage}
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