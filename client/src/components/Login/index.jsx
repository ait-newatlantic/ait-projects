import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

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
          navigate("/");
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
    <div className="flex justify-center items-center">
      <Form
        className="border rounded-2xl text-center flex flex-col space-y-5 p-4 mt-10 bg-white shadow-lg sm:min-w-[350px] "
        onSubmit={handleLogin}
        ref={form}
      >
        <img
          src="https://www.newatlantic.vn/img/logo.webp"
          className="object-scale-down h-14 w-28 mx-auto"
          alt="logo"
        />

        <div>
          <label htmlFor="username" className="font-bold">
            Tên người dùng
          </label>
          <Input
            className="bg-gray-100 text-center border rounded sm:min-w-[250px]"
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold">
            Mật khẩu
          </label>
          <Input
            className="bg-gray-100 text-center border rounded sm:min-w-[250px]"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />
        </div>
        <hr></hr>
        <a href="tel:0123456">
          <u>Quên mật khẩu ?</u>
        </a>
        <div className="form-group">
          <button
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-100 ... rounded px-10 py-2"
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
