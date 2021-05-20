import React, { useCallback } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useState } from "react";
import { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import * as MaterialUIIcons from "@material-ui/icons/";
import { FormHelperText, InputLabel, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import UserService from "../../services/user.service";
import BranchService from "../../services/branch.service";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
  },
  container: {
    maxHeight: 700,
  },
});

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Diary() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userResult, setUserResult] = useState([]);

  const [branches, setBranches] = useState([]);
  const [branch_name, setBranchName] = useState("");

  const [flag, setFlag] = useState(0);

  const columns = [
    {
      id: "branch_name",
      label: "Chi nhánh",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "name",
      label: "Tên người dùng",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "username",
      label: "Username",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "content",
      label: "Nội dung",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "createdAt",
      label: "Ngày tạo form",
      minWidth: "auto",
      align: "left",
      format: (value) => value.substring(0, 10),
    },
    {
      id: "updatedAt",
      label: "Ngày cập nhật",
      minWidth: "auto",
      align: "left",
      format: (value) => value.substring(0, 10),
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const FetchAllData = () => {
    UserService.get_users().then((response) => {
      setUserResult(response.data);
    });
  };

  const FetchBranches = () => {
    BranchService.get_branchs().then((response) => {
      setBranches(response.data);
    });
  };

  const handleSubmit = () => {
    UserService.get_user_by_branch(branch_name).then((response) => {
      setUserResult(response.data);
    });
  };

  const onClickFlag = () => {
    if (flag == 0) {
      setFlag(1);
    } else setFlag(0);
  };

  const onClickHide = (id) => {
    UserService.hide_user(id).then((response) => {
      console.log(response);
      handleSubmit();
    });
  };

  useEffect(() => {
    FetchAllData();
    FetchBranches();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [branch_name]);

  return (
    <div>
      <div className="row">
        <div className="col d-flex justify-content-start">
          <h4 className="font-weight-bold text-secondary text-left">
            NHẬT KÝ CÔNG VIỆC
          </h4>
        </div>
        <div className="col d-flex justify-content-end">
          <div>
            <Link
              to="/dashboard/users/list/history"
              className="btn btn-sm btn-hover"
              role="button"
            >
              <MaterialUIIcons.RestorePage />
              LỊCH SỬ
            </Link>
          </div>
          <div>
            <button className="btn btn-sm btn-hover" onClick={onClickFlag}>
              <MaterialUIIcons.FilterList />
              FILTER
            </button>
          </div>
          <div>
            <Link
              to="/dashboard/diary/input"
              className="btn btn-sm btn-hover"
              role="button"
            >
              <MaterialUIIcons.Add />
              TẠO MỚI
            </Link>
          </div>
          <div>
            <ReactHTMLTableToExcel
              className="btn btn-sm btn-hover"
              table="emp"
              filename="Danh sách users"
              sheet="Sheet"
              buttonText={
                <div>
                  <MaterialUIIcons.GetApp />
                  EXPORT
                </div>
              }
            />
          </div>
        </div>
      </div>
      {flag == 1 ? (
        <div className="d-flex row">
          <div className="col-md-3">
            <InputLabel shrink>Chi nhánh</InputLabel>
            <Autocomplete
              name="branchId"
              id="branchId"
              value={branch_name}
              onChange={(event, newValue) => {
                if (newValue === null) {
                  setBranchName("");
                } else setBranchName(newValue);
              }}
              options={branches.map((option) => option.branch_name)}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
            <FormHelperText>Nhập tên chi nhánh</FormHelperText>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <TableContainer className="table-container">
        <Table id="emp" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: "'auto'" }}>
                <strong className="text-danger">Xóa</strong>
              </TableCell>
              <TableCell align="center" style={{ minWidth: "'auto'" }}>
                <strong className="text-primary">Cập nhật</strong>
              </TableCell>
              <TableCell align="center" style={{ minWidth: "'auto'" }}>
                <strong>STT</strong>
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userResult
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center" style={{ minWidth: "'auto'" }}>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => onClickHide(row.id)}
                      >
                        <MaterialUIIcons.DeleteOutline />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "'auto'" }}>
                      <a
                        className="text-primary"
                        href={`/dashboard/customers/update/${row.id}`}
                      >
                        <MaterialUIIcons.Update />
                      </a>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "'auto'" }}>
                      {index + 1}
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[
          50,
          100,
          200,
          500,
          1000,
          { label: "All", value: -1 },
        ]}
        component="div"
        count={userResult.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
}
