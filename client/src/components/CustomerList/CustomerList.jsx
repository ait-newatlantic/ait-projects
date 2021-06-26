import React, { useCallback, useState, useEffect, useRef } from "react";

//Libraries
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import { CSVLink } from "react-csv";
import * as MaterialUIIcons from "@material-ui/icons/";

//Services
import CustomerService from "../../services/customer.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

//Functions
import DateFunc from "../../functions/datetime";

const headers = [
  { label: "Chi nhánh", key: "branchname" },
  { label: "Tên nhân viên", key: "user_name" },
  { label: "Khách hàng", key: "customername" },
  { label: "Địa chỉ khách hàng", key: "address" },
  { label: "SĐT khách hàng", key: "number" },
  { label: "Loại khách hàng", key: "bussiness_type" },
  { label: "Tên người đại diện", key: "manager" },
  { label: "SĐT người đại diện", key: "manager_number" },
  { label: "Email người đại diện", key: "manager_email" },
  { label: "Mã số thuế", key: "taxcode" },
  { label: "Khu vực khách hàng", key: "province" },
  { label: "Ngày tạo form", key: "createdAt" },
  { label: "Ngày cập nhật", key: "updatedAt" },
];

export default function CustomerList(props) {
  const [customerResult, setcustomerResult] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [branch_name, setBranchName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");
  const [manager_number, setManagerNumber] = useState("");
  const [manager_email, setManagerEmail] = useState("");
  const [taxcode, setTaxCode] = useState("");
  const [user, setUser] = useState("");
  const [username, setUserName] = useState("");
  const [user_name, setUser_Name] = useState("");
  const [province, setProvice] = useState("");
  const [business_type, setBusinessType] = useState("");
  const [datetype, setDateType] = useState("");
  const [order, setOrderType] = useState("DESC");
  const [limit, setLimit] = useState(200);
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(true);
  const [flag4, setFlag4] = useState(true);
  const [flag5, setFlag5] = useState(true);
  const [flag6, setFlag6] = useState(false);
  const [flag7, setFlag7] = useState(false);
  const [flag8, setFlag8] = useState(false);
  const [flag9, setFlag9] = useState(false);
  const [flag10, setFlag10] = useState(true);
  const [flag11, setFlag11] = useState(false);
  const isInitialMount = useRef(true);

  const currentUser = AuthService.getCurrentUser();

  const [from_date, setFromDate] = useState(`${DateFunc.year}-01-01`);
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );

  const onClickFlag = () => {
    setFlag(!flag);
  };

  const onClickFlag1 = () => {
    setFlag1(!flag1);
  };

  const onClickFlag2 = () => {
    setFlag2(!flag2);
  };

  const onClickFlag3 = () => {
    setFlag3(!flag3);
  };

  const onClickFlag4 = () => {
    setFlag4(!flag4);
  };

  const onClickFlag5 = () => {
    setFlag5(!flag5);
  };

  const onClickFlag6 = () => {
    setFlag6(!flag6);
  };

  const onClickFlag7 = () => {
    setFlag7(!flag7);
  };

  const onClickFlag8 = () => {
    setFlag8(!flag8);
  };

  const onClickFlag9 = () => {
    setFlag9(!flag9);
  };

  const onClickFlag10 = () => {
    setFlag10(!flag10);
  };

  const onClickFlag11 = () => {
    setFlag11(!flag11);
  };

  const handleSubmit = useCallback(() => {
    const hide = 0;
    CustomerService.get_customers_filtered(
      name,
      number,
      address,
      manager,
      manager_number,
      manager_email,
      taxcode,
      hide,
      username,
      user_name,
      province,
      business_type,
      datetype,
      from_date,
      to_date,
      branch_name,
      order,
      limit
    ).then((response) => {
      setcustomerResult(response.data);
      setExcelData(
        response.data.map((i) => ({
          branchname: i.user.branch.name,
          user_name: i.user.name,
          customername: i.name,
          address: i.address,
          number: i.number,
          business_type: i.business_type.name,
          manager: i.manager,
          manager_number: i.manager_number,
          manager_email: i.manager_email,
          taxcode: i.taxcode,
          province: i.province.name,
          createdAt: i.createdAt.substring(0, 10),
          updatedAt: i.updatedAt.substring(0, 10),
        }))
      );
    });
  }, [
    name,
    number,
    address,
    manager,
    manager_number,
    manager_email,
    taxcode,
    username,
    user_name,
    province,
    business_type,
    datetype,
    from_date,
    to_date,
    branch_name,
    order,
    limit,
  ]);

  const getUser = useCallback(() => {
    UserService.get_user(currentUser.id).then((response) => {
      setUser(response.data);
      if (response.data.roles[0].id === 4) {
        //User is an employee
        setUserName(response.data.username);
        setBranchName(response.data.branch.name);
      } else if (response.data.roles[0].id === 2) {
        //User is an moderator
        setBranchName(response.data.branch.name);
      } else {
        handleSubmit();
      }
    });
  }, [currentUser.id, handleSubmit]);

  const onClickHide = (id) => {
    const hide = 1;
    CustomerService.hide_customer(hide, id).then((response) => {
      handleSubmit();
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Your useEffect code here to be run on initial render
      getUser();
    } else {
      // Your useEffect code here to be run on update
      handleSubmit();
    }
  }, [handleSubmit, getUser]);

  return (
    <div>
      <div className="justify-content-start">
        <h4 className="font-weight-bold text-dark text-left">BÁO CÁO</h4>
      </div>
      <div className="flex d-flex flex-wrap align-items-center justify-content-between rounded">
        <div className="flex d-flex flex-wrap align-items-center justify-content-start">
          <div>
            <button className="btn btn-sm btn-hover" onClick={onClickFlag}>
              <MaterialUIIcons.FilterList />
            </button>
          </div>
          <div>
            <FormControl size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                onClick={(e) => setLimit(e.target.value)}
                disableUnderline
              >
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={400}>400</MenuItem>
                <MenuItem value={600}>600</MenuItem>
                <MenuItem value={800}>800</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={null}>All</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex d-flex flex-wrap align-items-center justify-content-end">
          <div>
            <Link
              to="/dashboard/customers/input"
              className="btn btn-sm btn-hover"
              role="button"
            >
              <MaterialUIIcons.Add />
            </Link>
          </div>
          <div>
            <CSVLink
              headers={headers}
              data={excelData}
              className="btn btn-sm btn-hover"
              filename={"Danh sách khách hàng.csv"}
              target="_blank"
            >
              <MaterialUIIcons.GetApp />
            </CSVLink>
          </div>
        </div>
      </div>
      <div>
        {flag ? (
          <div className="bg-light">
            <div className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                inline
                label="Chi nhánh"
                defaultChecked={flag1}
                onClick={onClickFlag1}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Tên nhân viên"
                defaultChecked={flag2}
                onClick={onClickFlag2}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Tên khách hàng"
                defaultChecked={flag3}
                onClick={onClickFlag3}
              />
              <Form.Check
                type="checkbox"
                inline
                label="SĐT khách hàng"
                defaultChecked={flag4}
                onClick={onClickFlag4}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Địa chỉ khách hàng"
                defaultChecked={flag5}
                onClick={onClickFlag5}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Tên người đại diện"
                defaultChecked={flag6}
                onClick={onClickFlag6}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Email người đại diện"
                defaultChecked={flag7}
                onClick={onClickFlag7}
              />
              <Form.Check
                type="checkbox"
                inline
                label="SĐT người đại diện"
                defaultChecked={flag8}
                onClick={onClickFlag8}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Mã số thuế"
                defaultChecked={flag9}
                onClick={onClickFlag9}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Khu vực khách hàng"
                defaultChecked={flag10}
                onClick={onClickFlag10}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Ngày"
                defaultChecked={flag11}
                onClick={onClickFlag11}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div style={{ overflow: "scroll", height: "80vh" }}>
        <Table id="emp" className="text-left" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <FormHelperText className="text-dark">
                  Total ({customerResult.length})
                </FormHelperText>
                <FormControl>
                  <Select
                    labelId="order_type"
                    id="order_type"
                    displayEmpty
                    value={order}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <MenuItem value="DESC">Mới nhất</MenuItem>
                    <MenuItem value="ASC">Cũ nhất</MenuItem>
                  </Select>
                </FormControl>
              </th>
              {flag1 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Chi nhánh (
                    {
                      [
                        ...new Set(
                          customerResult.map(
                            (option) => option.user.branch.name
                          )
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={branch_name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setBranchName("");
                      } else setBranchName(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.user.branch.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag2 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Tên nhân viên (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.user.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={user_name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setUser_Name("");
                      } else setUser_Name(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.user.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag3 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Tên khách hàng (
                    {
                      [...new Set(customerResult.map((option) => option.name))]
                        .length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setName("");
                      } else setName(newValue);
                    }}
                    options={[
                      ...new Set(customerResult.map((option) => option.name)),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag4 ? (
                <th>
                  <FormHelperText className="text-dark">
                    SĐT khách hàng (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.number)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={number}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setNumber("");
                      } else setNumber(newValue);
                    }}
                    options={[
                      ...new Set(customerResult.map((option) => option.number)),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag5 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Địa chỉ khách hàng (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.address)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={address}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setAddress("");
                      } else setAddress(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.address)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag6 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Tên người đại diện (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.manager)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={manager}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setManager("");
                      } else setManager(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.manager)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag7 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Email người đại diện (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.manager_email)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={manager_email}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setManagerEmail("");
                      } else setManagerEmail(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.manager_email)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag8 ? (
                <th>
                  <FormHelperText className="text-dark">
                    SĐT người đại diện (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.manager_number)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={manager_number}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setManagerNumber("");
                      } else setManagerNumber(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.manager_number)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag9 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Mã số thuế (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.taxcode)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={taxcode}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setTaxCode("");
                      } else setTaxCode(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.taxcode)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag10 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Khu vực khách hàng (
                    {
                      [
                        ...new Set(
                          customerResult.map((option) => option.province.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={province}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setProvice("");
                      } else setProvice(newValue);
                    }}
                    options={[
                      ...new Set(
                        customerResult.map((option) => option.province.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag11 ? (
                <th colSpan="2">
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <FormHelperText className="text-dark">
                        Loại ngày
                      </FormHelperText>
                      <FormControl>
                        <Select
                          labelId="date_type"
                          id="date_type"
                          displayEmpty
                          value={datetype}
                          onChange={(e) => setDateType(e.target.value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="createdAt">Create</MenuItem>
                          <MenuItem value="updatedAt">Update</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs>
                      <FormHelperText className="text-dark">
                        Từ ngày
                      </FormHelperText>
                      <TextField
                        id="from_date"
                        type="date"
                        value={from_date}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs>
                      <FormHelperText className="text-dark">
                        Đến ngày
                      </FormHelperText>
                      <TextField
                        id="to_date"
                        type="date"
                        value={to_date}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {!!customerResult &&
              customerResult.map((i, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {flag1 ? <td>{i.user.branch.name}</td> : null}
                  {flag2 ? <td>{i.user.name}</td> : null}
                  {flag3 ? <td>{i.name}</td> : null}
                  {flag4 ? <td>{i.number}</td> : null}
                  {flag5 ? <td>{i.address}</td> : null}
                  {flag6 ? <td>{i.manager}</td> : null}
                  {flag7 ? <td>{i.manager_email}</td> : null}
                  {flag8 ? <td>{i.manager_number}</td> : null}
                  {flag9 ? <td>{i.taxcode}</td> : null}
                  {flag10 ? <td>{i.province.name}</td> : null}
                  {flag11 ? (
                    <td>Tạo ngày {i.createdAt.substring(0, 10)}</td>
                  ) : null}
                  {flag11 ? (
                    <td>Cập nhật ngày {i.updatedAt.substring(0, 10)}</td>
                  ) : null}
                  <td>
                    <Link
                      className="btn btn-primary btn-sm"
                      to={"/dashboard/customers/update/" + btoa(`${i.id}`)}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onClickHide(i.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
