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
  const [business_type_name, setBusinessTypeName] = useState("");
  const [province_name, setProvinceName] = useState("");
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
        setBusinessTypeName(response.data.business_type.name);
        setProvinceName(response.data.province.name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div>
      <div className="text-left">
        <h4 className="font-weight-bold text-secondary">CẬP NHẬT KHÁCH HÀNG</h4>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div className="text-left">
            <div>
              <h6>
                <strong>Thông tin khách hàng</strong>
              </h6>
              <div className="row">
                <div className="col-sm">
                  Tên khách hàng:
                  <div
                    className="form-control"
                    style={{ overflow: "auto", background: "#e7e7e7" }}
                  >
                    {customer.name}
                  </div>
                </div>
                <div className="col-sm">
                  SĐT khách hàng:
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
                  Khu vực khách hàng:
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {province_name}
                  </div>
                </div>
                <div className="col-sm">
                  Hình thức khách hàng:
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {business_type_name}
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-sm">
                  Địa chỉ khách hàng:
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {customer.address}
                  </div>
                </div>
              </div>
            </div>
            <br />
            {business_type_name == "DOANH NGHIỆP" ? (
              <div>
                <h6>
                  <strong>Thông tin người đại diện</strong>
                </h6>
                <div className="row ">
                  <div className="col-sm">
                    Tên người đại diện:
                    <input
                      type="manager"
                      className="form-control"
                      name="manager"
                      defaultValue={customer.manager}
                      onChange={onChangemanager}
                    />
                  </div>
                  <div className="col-sm">
                    SĐT người đại diện:
                    <input
                      type="manager_number"
                      className="form-control"
                      name="manager_number"
                      defaultValue={customer.manager_number}
                      onChange={onChangemanager_Number}
                    />
                  </div>
                  <div className="col-sm">
                    Email người đại diện:
                    <input
                      type="manager_email"
                      className="form-control"
                      name="manager_email"
                      defaultValue={customer.manager_email}
                      onChange={onChangemanager_Email}
                    />
                  </div>
                </div>
                <br />
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <div>
                <h6>
                  <strong>Thông tin người nhập</strong>
                </h6>
                <div className="row">
                  <div className="col-sm">
                    Người nhập:
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
            <br />
            <div>
              <button
                className="btn btn-warning btn-sm"
                role="button"
                onClick={handleSubmit}
              >
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
  );
}
