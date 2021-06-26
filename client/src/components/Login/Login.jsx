import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { Checkbox } from "@material-ui/core";
import ColorFunc from "../../functions/colors";
import { useEffect } from "react";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login(props) {
  const form = useRef();
  const checkBtn = useRef();
  const [rand, setRand] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRand(
      ColorFunc.colors[Math.floor(Math.random() * ColorFunc.colors.length)]
    ); //pick random color
  }, []);

  return (
    <div style={rand}>
      <div className="container" style={{ height: "100vh" }}>
        <div className="row align-items-center h-100">
          <div className="shadow card-glass col col-xl-6 col-lg-6 col-md-6 col-sm-12 p-4 mx-auto rounded">
            <Form onSubmit={handleLogin} ref={form}>
              <p className="lead text-left text-dark">Login</p>
              <div className="form-group">
                <Input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <Input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
              <div className="text-left text-dark">
                <Checkbox
                  defaultChecked={passwordShown}
                  size="medium"
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  onClick={togglePasswordVisiblity}
                />
                Hiện mật khẩu
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col text-secondary text-left">
                    <a className="text-dark" href="tel: +84918628660">
                      Bạn quên mật khẩu?
                    </a>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
