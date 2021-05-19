import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import UserService from "../../services/user.service";
import { CSVLink } from "react-csv";

export default function UserList() {
  const [userResult, setUserResult] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [branch_name, setBranchName] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const headers = [
    { label: "Chi nhánh", key: "branchname" },
    { label: "Tên nhân viên", key: "name" },
    { label: "Tài khoản", key: "username" },
    { label: "Email", key: "email" },
    { label: "Quyền hạn", key: "role" },
    { label: "Ngày tạo", key: "createdAt" },
    { label: "Ngày cập nhật", key: "updatedAt" },
  ];

  const handleSubmit = () => {
    const hide = 0;
    UserService.get_user_by_branch(
      hide,
      branch_name,
      username,
      email,
      name,
      role
    ).then((response) => {
      setUserResult(response.data);
      setExcelData(
        response.data.map((i) => ({
          branchname: i.branch.name,
          name: i.name,
          username: i.username,
          email: i.email,
          role: i.roles[0].name,
          createdAt: i.createdAt.substring(0, 10),
          updatedAt: i.updatedAt.substring(0, 10),
        }))
      );
    });
  };

  const onClickHide = (id) => {
    const hide = 1;
    UserService.hide_user(hide, id).then((response) => {
      console.log(response);
      handleSubmit();
    });
  };

  useEffect(() => {
    handleSubmit();
  }, [branch_name, username, email, name, role]);

  return (
    <div>
      <div className="row">
        <div className="col d-flex justify-content-start">
          <h4 className="font-weight-bold text-secondary text-left">
            DANH SÁCH USERS
          </h4>
        </div>
        <div className="col d-flex justify-content-end">
          <div>
            <Link
              to="/dashboard/admin/users/list/history"
              className="btn btn-sm btn-hover"
              role="button"
            >
              LỊCH SỬ
            </Link>
          </div>
          <div>
            <Link
              to="/dashboard/register"
              className="btn btn-sm btn-hover"
              role="button"
            >
              TẠO MỚI
            </Link>
          </div>
          <CSVLink
            headers={headers}
            data={excelData}
            className="btn btn-sm btn-hover"
            filename={"Danh sách users.csv"}
            target="_blank"
          >
            EXPORT
          </CSVLink>
        </div>
      </div>
      <Table
        id="emp"
        className="table-container text-left"
        striped
        bordered
        responsive
        hover
        size="sm"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>
              Chi nhánh
              <Autocomplete
                value={branch_name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setBranchName("");
                  } else setBranchName(newValue);
                }}
                options={[
                  ...new Set(userResult.map((option) => option.branch.name)),
                ]}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </th>
            <th>
              Tên nhân viên
              <Autocomplete
                value={name}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setName("");
                  } else setName(newValue);
                }}
                options={[...new Set(userResult.map((option) => option.name))]}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </th>
            <th>
              Tài khoản
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
            <th>
              Email
              <Autocomplete
                value={email}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setEmail("");
                  } else setEmail(newValue);
                }}
                options={[...new Set(userResult.map((option) => option.email))]}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </th>
            <th>
              Quyền hạn
              <Autocomplete
                value={role}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setRole("");
                  } else setRole(newValue);
                }}
                options={[
                  ...new Set(userResult.map((option) => option.roles[0].name)),
                ]}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </th>
            <th>Ngày tạo user</th>
            <th>Ngày cập nhật</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!userResult &&
            userResult.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.branch.name}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles[0].name}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>{user.updatedAt.substring(0, 10)}</td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm"
                    to={"/dashboard/users/update/" + btoa(`${user.id}`)}
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onClickHide(user.id)}
                  >
                    Hide
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
