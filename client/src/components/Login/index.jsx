import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import company from "../../assets/images/company.png"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = () => {
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
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/home");
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
    <div className="bg-center bg-cover bg-no-repeat h-screen flex justify-center items-center" style={{backgroundImage: `url(${company})`}}>
      <Form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full lg:w-1/2 mx-auto"
        onSubmit={handleLogin}
        ref={form}
      >
        <img
          src="https://www.newatlantic.vn/img/logo.webp"
          className="object-scale-down h-14 w-28 mx-auto"
          alt="logo"
        />
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" for="username">
            Tên đăng nhập
          </label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
          />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
            Mật khẩu
          </label>
          <Input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />
        </div>
        <a className="mb-4" href="tel:0123456">
          <u>Quên mật khẩu?</u>
        </a>
        <div className="form-group">
          <button
            className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Đăng nhập</span>
          </button>
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
  );
};
export default Login;
