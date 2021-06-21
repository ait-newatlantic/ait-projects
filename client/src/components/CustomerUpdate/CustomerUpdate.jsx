import React, { useState, useRef, useEffect } from "react";
import { Alert } from "react-bootstrap";
import CustomerService from "../../services/customer.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import AuthService from "../../services/auth.service";

export default function CustomerUpdate(props) {
  const [manager, setmanager] = useState("");
  const [manager_number, setmanager_Number] = useState("");
  const [manager_email, setmanager_Email] = useState("");
  const [customer, setCustomer] = useState("");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const form = useRef();
  const checkBtn = useRef();

  const onChangemanager = (e) => {
    const manager = e.target.value;
    setmanager(manager);
  };

  const onChangemanager_Number = (e) => {
    const manager_number = e.target.value;
    setmanager_Number(manager_number);
  };

  const onChangemanager_Email = (e) => {
    const manager_email = e.target.value;
    setmanager_Email(manager_email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    const id = atob(props.match.params.id);
    if (checkBtn.current.context._errors.length === 0) {
      CustomerService.update_customer(
        id,
        manager,
        manager_number,
        manager_email
      ).then(
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

  const FetchData = () => {
    const id = atob(props.match.params.id);
    CustomerService.get_customer(id)
      .then((response) => {
        setCustomer(response.data);
        setmanager(response.data.manager);
        setmanager_Email(response.data.manager_email);
        setmanager_Number(response.data.manager_number);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    FetchData();
  }, []);

  return customer ? (
    <div>
      <div className="text-left">
        <h4 className="font-weight-bold text-secondary">CẬP NHẬT KHÁCH HÀNG</h4>
        <h6 className="font-weight-bold text-secondary">
          Form cập nhật khách hàng
        </h6>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div className="text-left">
            <div className="form-group">
              <h6 className="font-weight-bold">Thông tin khách hàng</h6>
              <div className="row">
                <div className="col-sm">
                  <label>Tên khách hàng:</label>
                  <div
                    className="form-control"
                    style={{ overflow: "auto", background: "#e7e7e7" }}
                  >
                    {customer.name}
                  </div>
                </div>
                <div className="col-sm">
                  <label>SĐT khách hàng:</label>
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {customer.number}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <label>Khu vực khách hàng:</label>
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {customer.province.name}
                  </div>
                </div>
                <div className="col-sm">
                  <label>Hình thức khách hàng:</label>
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {customer.business_type.name}
                  </div>
                </div>
                {customer.business_type.id === 2 ? (
                  <div className="col-sm">
                    <label>Mã số thuế:</label>
                    <div
                      className="form-control"
                      style={{ background: "#e7e7e7" }}
                    >
                      {customer.taxcode}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="row ">
                <div className="col-sm">
                  <label>Địa chỉ khách hàng:</label>
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {customer.address}
                  </div>
                </div>
              </div>
            </div>
            {customer.business_type.id === 2 ? (
              <div className="form-group">
                <h6 className="font-weight-bold">Thông tin người đại diện</h6>
                <div className="row ">
                  <div className="col-sm">
                    <label>Tên người đại diện:</label>
                    <input
                      type="manager"
                      className="form-control"
                      name="manager"
                      defaultValue={customer.manager}
                      onChange={onChangemanager}
                    />
                  </div>
                  <div className="col-sm">
                    <label>SĐT người đại diện:</label>
                    <input
                      type="manager_number"
                      className="form-control"
                      name="manager_number"
                      defaultValue={customer.manager_number}
                      onChange={onChangemanager_Number}
                    />
                  </div>
                  <div className="col-sm">
                    <label>Email người đại diện:</label>
                    <input
                      type="manager_email"
                      className="form-control"
                      name="manager_email"
                      defaultValue={customer.manager_email}
                      onChange={onChangemanager_Email}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-group"></div>
            )}
            <div className="form-group">
              <div>
                <h6 className="font-weight-bold">Thông tin người nhập</h6>
                <div className="row">
                  <div className="col-sm">
                    <label>Người nhập:</label>
                    <p
                      className="form-control"
                      style={{ background: "#e7e7e7" }}
                    >
                      {currentUser.username} - {currentUser.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="btn btn-warning btn-sm" onClick={handleSubmit}>
                GỬI FORM
              </button>
            </div>
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
              <Alert key={message.message}>
                <Alert.Heading>{message.heading}</Alert.Heading>
                <p>{message.message}</p>
              </Alert>
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  ) : (
    <div></div>
  );
}
