import React from "react";
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
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as MaterialUIIcons from "@material-ui/icons/";
import { FormHelperText, InputLabel, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";

import DemandService from "../../services/demand.service";
import BranchService from "../../services/branch.service";
import UserService from "../../services/user.service";
import ProvinceService from "../../services/province.service";
import CustomerTypeService from "../../services/customer_type.service";
import ContactTypeService from "../../services/contact_type.service";
import DemandStatusService from "../../services/demand_status.service";
import CarModelService from "../../services/car_model.service";
import CarTypeService from "../../services/car_type.service";

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

export default function DemandList() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const newDate = new Date();
  const year = newDate.getFullYear();

  const [from_date, setFromDate] = useState(`${year}-01-01`);
  const [to_date, setToDate] = useState(`${year}-12-31`);

  const [demandResult, setDemandResult] = useState([]);

  const [branches, setBranches] = useState([]);
  const [branch_name, setBranchName] = useState("");

  const [demand_employees, setDemandEmployees] = useState([]);
  const [demand_employee_name, setDemandEmployeeName] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [province_name, setProvinceName] = useState("");

  const [customer_types, setCustomerTypes] = useState([]);
  const [customer_type_name, setCustomerTypeName] = useState("");

  const [contact_types, setContactTypes] = useState([]);
  const [contact_type_name, setContactTypeName] = useState("");

  const [demand_statuses, setDemandStatuses] = useState([]);
  const [demand_status_name, setDemandStatusName] = useState("");

  const [car_models, setCarModels] = useState([]);
  const [car_model_name, setCarModelName] = useState("");

  const [car_types, setCarTypes] = useState([]);
  const [car_type_name, setCarTypeName] = useState("");

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
      label: "Người nhập",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "demand_employee",
      label: "Người gặp khách hàng",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "customer_name",
      label: "Tên khách hàng",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "customer_number",
      label: "SĐT khách hàng",
      align: "left",
      minWidth: "auto",
    },
    {
      id: "customer_type_name",
      label: "Loại khách hàng",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "province_name",
      label: "Khu vực khách hàng",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "demand_opinion",
      label: "Ý kiến khách hàng",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "contact_type_name",
      label: "Phương thức liên lạc",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "demand_status_name",
      label: "Giai đoạn",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "car_model_name",
      label: "Model xe",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "car_type_name",
      label: "Loại xe",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "demand_quantity",
      label: "Số lượng xe",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "color_name",
      label: "Màu xe",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "demand_note",
      label: "Ghi chú",
      minWidth: "auto",
      align: "left",
    },
    {
      id: "demand_date",
      label: "Ngày giai đoạn",
      minWidth: "auto",
      align: "left",
      format: (value) => value.substring(0, 10),
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

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const FetchBranches = () => {
    BranchService.get_branchs().then((response) => {
      setBranches(response.data);
    });
  };

  const FetchEmployees = () => {
    UserService.get_users().then((response) => {
      setDemandEmployees(response.data);
    });
  };

  const FetchProvinces = () => {
    ProvinceService.get_provinces().then((response) => {
      setProvinces(response.data);
    });
  };

  const FetchDemandStatuses = () => {
    DemandStatusService.get_demand_statuses().then((response) => {
      setDemandStatuses(response.data);
    });
  };

  const FetchCarModels = () => {
    CarModelService.get_car_models().then((response) => {
      setCarModels(response.data);
    });
  };

  const FetchCarTypes = () => {
    CarTypeService.get_car_types().then((response) => {
      setCarTypes(response.data);
    });
  };

  const FetchCustomerTypes = () => {
    CustomerTypeService.get_customer_types().then((response) => {
      setCustomerTypes(response.data);
    });
  };

  const FetchContactTypes = () => {
    ContactTypeService.get_contact_types().then((response) => {
      setContactTypes(response.data);
    });
  };

  const onChangeFromDate = (e) => {
    const from_date = e.target.value;
    setFromDate(from_date);
  };

  const onChangeToDate = (e) => {
    const to_date = e.target.value;
    setToDate(to_date);
  };

  const handleSubmit = () => {
    const username = "";
    DemandService.get_demands_by_branch(
      username,
      branch_name,
      demand_employee_name,
      province_name,
      customer_type_name,
      contact_type_name,
      demand_status_name,
      car_model_name,
      car_type_name,
      from_date,
      to_date
    ).then((response) => {
      setDemandResult(response.data);
    });
  };

  const onClickHide = (id) => {
    DemandService.hide_demand(id).then((response) => {
      console.log(response);
      handleSubmit();
    });
  };

  const onClickFlag = () => {
    if (flag == 0) {
      setFlag(1);
    } else setFlag(0);
  };

  useEffect(() => {
    handleSubmit();
    FetchBranches();
    FetchEmployees();
    FetchDemandStatuses();
    FetchCarModels();
    FetchCarTypes();
    FetchContactTypes();
    FetchCustomerTypes();
    FetchProvinces();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [
    branch_name,
    demand_employee_name,
    province_name,
    customer_type_name,
    contact_type_name,
    demand_status_name,
    car_model_name,
    car_type_name,
    from_date,
    to_date,
  ]);

  return (
    <div>
      <div className="row">
        <div className="col d-flex justify-content-start text-left">
          <h4 className="font-weight-bold text-secondary">DANH SÁCH NHU CẦU</h4>
          <p className="font-weight-bold text-secondary">
            ({from_date} đến {to_date})
          </p>
        </div>
        <div className="col d-flex justify-content-end">
          <div>
            <Link
              to="/dashboard/demands/list/history"
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
              to="/dashboard/demands/input"
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
              filename="Danh sách nhu cầu khách hàng"
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
        <div>
          <div className="row">
            <div className="col-sm">
              <InputLabel shrink>Từ ngày</InputLabel>
              <input
                type="date"
                className="form-control"
                name="from_date"
                value={from_date}
                onChange={onChangeFromDate}
              />
            </div>
            <div className="col-sm">
              <InputLabel shrink>Đến ngày</InputLabel>
              <input
                type="date"
                className="form-control"
                name="to_date"
                value={to_date}
                onChange={onChangeToDate}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Chi nhánh</InputLabel>
              <Autocomplete
                name="branch_name"
                id="branch_name"
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
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Người gặp khách hàng</InputLabel>
              <Autocomplete
                name="demand_employee_name"
                id="demand_employee_name"
                value={demand_employee_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setDemandEmployeeName("");
                  } else setDemandEmployeeName(newValue);
                }}
                inputValue={demand_employee_name}
                onInputChange={(event, newInputValue) => {
                  setDemandEmployeeName(newInputValue);
                }}
                options={demand_employees.map((option) => option.name)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
              <FormHelperText>Nhập người đi thực tế</FormHelperText>
            </div>
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Khu vực</InputLabel>
              <Autocomplete
                name="province_name"
                id="province_name"
                value={province_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setProvinceName("");
                  } else setProvinceName(newValue);
                }}
                options={provinces.map((option) => option.province_name)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
              <FormHelperText>Nhập khu vực</FormHelperText>
            </div>
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Loại khách hàng</InputLabel>
              <Autocomplete
                name="customer_type_name"
                id="customer_type_name"
                value={customer_type_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setCustomerTypeName("");
                  } else setCustomerTypeName(newValue);
                }}
                options={customer_types.map(
                  (option) => option.customer_type_name
                )}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
              <FormHelperText>Nhập loại khách hàng</FormHelperText>
            </div>
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Phương thức liên lạc</InputLabel>
              <Autocomplete
                name="contact_type_name"
                id="contact_type_name"
                value={contact_type_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setContactTypeName("");
                  } else setContactTypeName(newValue);
                }}
                options={contact_types.map(
                  (option) => option.contact_type_name
                )}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
              <FormHelperText>Nhập phương thức liên lạc</FormHelperText>
            </div>
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Giai đoạn</InputLabel>
              <Autocomplete
                name="demand_status_name"
                id="demand_status_name"
                value={demand_status_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setDemandStatusName("");
                  } else setDemandStatusName(newValue);
                }}
                options={demand_statuses.map(
                  (option) => option.demand_status_name
                )}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
              <FormHelperText>Nhập giai doạn</FormHelperText>
            </div>
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Model xe</InputLabel>
              <Autocomplete
                name="car_model_name"
                id="car_model_name"
                value={car_model_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setCarModelName("");
                  } else setCarModelName(newValue);
                }}
                options={car_models.map((option) => option.car_model_name)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
              <FormHelperText>Nhập model xe</FormHelperText>
            </div>
            <div className="col-sm-6 col-md-3  ">
              <InputLabel shrink>Loại xe</InputLabel>
              <Autocomplete
                name="car_type_name"
                id="car_type_name"
                value={car_type_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setCarTypeName("");
                  } else setCarTypeName(newValue);
                }}
                options={car_types.map((option) => option.car_type_name)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
              <FormHelperText>Nhập loại xe</FormHelperText>
            </div>
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
            {demandResult
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
                      <Link
                        className="text-primary"
                        to={`/dashboard/demands/update/` + btoa(`${row.id}`)}
                      >
                        <MaterialUIIcons.Update />
                      </Link>
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
        rowsPerPageOptions={[50, 100, 200, { label: "All", value: -1 }]}
        component="div"
        count={demandResult.length}
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
