import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import BranchService from "../../services/branch.service";
import AuthService from "../../services/auth.service";
import { Button } from "react-bootstrap";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeBranch = (e) => {
    const branchId = e.target.value;
    setBranchId(parseInt(branchId));
  };

  const FetchBranches = () => {
    BranchService.get_branchs().then((response) => {
      setBranches(response.data);
      setBranchId(parseInt(response.data[0].id));
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, name, branchId, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  useEffect(() => {
    FetchBranches();
  }, []);

  return (
    <div className="text-left">
      <div>
        <h4 className="font-weight-bold text-dark">TẠO USER MỚI</h4>
      </div>
      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <h6>Thông tin users</h6>
            <div className="row">
              <div className="col-sm">
                Họ và tên:
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required, vname]}
                />
              </div>

              <div className="col-sm">
                Chi nhánh:
                <Select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={onChangeBranch}
                >
                  {!!branches &&
                    branches.map((Branch) => (
                      <option key={Branch.id} value={Branch.id}>
                        {Branch.name}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm">
                Username:
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="col-sm">
                Email:
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="col-sm">
                Password:
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
            </div>
            <br />
            <Button className="btn-sm" variant="warning" type="submit">
              Đăng ký
            </Button>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Register;
