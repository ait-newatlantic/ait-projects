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
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

//Functions
import DateFunc from "../../functions/datetime";

const headers = [
  { label: "Chi nhánh", key: "branchname" },
  { label: "Tên nhân viên", key: "name" },
  { label: "Tài khoản", key: "username" },
  { label: "Email", key: "email" },
  { label: "Quyền hạn", key: "role" },
  { label: "Ngày tạo", key: "createdAt" },
  { label: "Ngày cập nhật", key: "updatedAt" },
];

export default function UserList(props) {
  const [userResult, setUserResult] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [User, setUser] = useState("");
  const [branch_name, setBranchName] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [datetype, setDateType] = useState("");
  const [order, setOrderType] = useState("DESC");
  const [limit, setLimit] = useState(200);
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);
  const [flag4, setFlag4] = useState(true);
  const [flag5, setFlag5] = useState(true);
  const [flag6, setFlag6] = useState(false);
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

  const handleSubmit = useCallback(() => {
    const hide = 0;
    UserService.get_users_filtered(
      hide,
      branch_name,
      username,
      email,
      name,
      role,
      order,
      datetype,
      from_date,
      to_date,
      limit
    ).then((response) => {
      setUserResult(response.data);
      setExcelData(
        response.data.map((i) => ({
          branchname: i.Branch.name,
          name: i.name,
          username: i.username,
          email: i.email,
          role: i.Roles[0].name,
          createdAt: i.createdAt.substring(0, 10),
          updatedAt: i.updatedAt.substring(0, 10),
        }))
      );
    });
  }, [
    branch_name,
    username,
    email,
    name,
    role,
    order,
    datetype,
    from_date,
    to_date,
    limit,
  ]);

  const getUser = useCallback(() => {
    UserService.get_user(currentUser.id).then((response) => {
      setUser(response.data);
      if (response.data.Roles[0].id === 4) {
        //User is an employee
        setUserName(response.data.username);
        setBranchName(response.data.Branch.name);
      } else if (response.data.Roles[0].id === 2) {
        //User is an moderator
        setBranchName(response.data.Branch.name);
      } else {
        handleSubmit();
      }
    });
  }, [currentUser.id, handleSubmit]);

  const onClickHide = (id) => {
    const hide = 1;
    UserService.hide_user(hide, id).then((response) => {
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
              to="/dashboard/register"
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
              filename={"Danh sách users.csv"}
              target="_blank"
            >
              <MaterialUIIcons.GetApp />
            </CSVLink>
          </div>
        </div>
      </div>
      <div>
        {flag ? (
          <div className="flex d-flex flex-wrap align-items-center">
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
              label="Tài khoản"
              defaultChecked={flag3}
              onClick={onClickFlag3}
            />
            <Form.Check
              type="checkbox"
              inline
              label="Email"
              defaultChecked={flag4}
              onClick={onClickFlag4}
            />
            <Form.Check
              type="checkbox"
              inline
              label="Quyền hạn"
              defaultChecked={flag5}
              onClick={onClickFlag5}
            />
            <Form.Check
              type="checkbox"
              inline
              label="Ngày"
              defaultChecked={flag6}
              onClick={onClickFlag6}
            />
          </div>
        ) : null}
      </div>
      <div style={{ overflow: "scroll", height: "80vh" }}>
        <Table id="emp" className="text-left" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <FormHelperText className="text-dark">
                  Total ({userResult.length})
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
                          userResult.map((option) => option.Branch.name)
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
                        userResult.map((option) => option.Branch.name)
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
                      [...new Set(userResult.map((option) => option.name))]
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
                      ...new Set(userResult.map((option) => option.name)),
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
                    Tài khoản (
                    {
                      [...new Set(userResult.map((option) => option.username))]
                        .length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={username}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setUserName("");
                      } else setUserName(newValue);
                    }}
                    options={[
                      ...new Set(userResult.map((option) => option.username)),
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
                    Email (
                    {
                      [...new Set(userResult.map((option) => option.email))]
                        .length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={email}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setEmail("");
                      } else setEmail(newValue);
                    }}
                    options={[
                      ...new Set(userResult.map((option) => option.email)),
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
                    Quyền hạn (
                    {
                      [
                        ...new Set(
                          userResult.map((option) => option.Roles[0].name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={role}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setRole("");
                      } else setRole(newValue);
                    }}
                    options={[
                      ...new Set(
                        userResult.map((option) => option.Roles[0].name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag6 ? (
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
            {!!userResult &&
              userResult.map((User, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {flag1 ? <td>{User.Branch.name}</td> : null}
                  {flag2 ? <td>{User.name}</td> : null}
                  {flag3 ? <td>{User.username}</td> : null}
                  {flag4 ? <td>{User.email}</td> : null}
                  {flag5 ? <td>{User.Roles[0].name}</td> : null}
                  {flag6 ? (
                    <td>Tạo ngày {User.createdAt.substring(0, 10)}</td>
                  ) : null}
                  {flag6 ? (
                    <td>Cập nhật ngày {User.updatedAt.substring(0, 10)}</td>
                  ) : null}
                  <td>
                    <Link
                      className="btn btn-primary btn-sm"
                      to={"/dashboard/users/update/" + btoa(`${User.id}`)}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onClickHide(User.id)}
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
