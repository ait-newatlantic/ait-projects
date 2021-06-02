import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row align-items-center h-100">
        <div className="shadow-lg card col-xl-8 col-lg-8 col-md-6 col-sm-12 col mx-auto rounded">
          <div
            className="row align-items-center p-4 rounded"
            style={{ background: "#1C4E80" }}
          >
            <div className="col-md-4 col-sm">
              <span className="lead text-left font-italic text-light align-middle">
                New Atlantic International Trading JSC
              </span>
            </div>
            <div className="col-md-8 col-sm bg-white rounded p-4">
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
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-secondary btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
                <div className="flex d-flex justify-content-end">
                  <small className="text-secondary font-italic">
                    <a className="text-secondary" href="tel: +84918628660">
                      Forgot your password?
                    </a>
                  </small>
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
    </div>
  );
};

export default Login;
