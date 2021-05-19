import React, { useState, useRef, useEffect } from "react";
import { Alert } from "react-bootstrap";
import CustomerService from "../../services/customer.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import AuthService from "../../services/auth.service";

export default function CustomerUpdate(props) {
  const [customer_manager, setCustomer_manager] = useState("");
  const [customer_manager_number, setCustomer_manager_Number] = useState("");
  const [customer_manager_email, setCustomer_manager_Email] = useState("");
  const [business_type_name, setBusinessTypeName] = useState("");
  const [customers, setCustomers] = useState([]);

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const form = useRef();
  const checkBtn = useRef();

  const onChangeCustomer_manager = (e) => {
    const customer_manager = e.target.value;
    setCustomer_manager(customer_manager);
  };

  const onChangeCustomer_manager_Number = (e) => {
    const customer_manager_number = e.target.value;
    setCustomer_manager_Number(customer_manager_number);
  };

  const onChangeCustomer_manager_Email = (e) => {
    const customer_manager_email = e.target.value;
    setCustomer_manager_Email(customer_manager_email);
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
        customer_manager,
        customer_manager_number,
        customer_manager_email
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
    CustomerService.get_specific_customer(id)
      .then((response) => {
        setCustomers(response.data);
        setCustomer_manager(response.data[0].customer_manager);
        setCustomer_manager_Email(response.data[0].customer_manager_email);
        setCustomer_manager_Number(response.data[0].customer_manager_number);
        setBusinessTypeName(response.data[0].business_type_name);
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
                    {!!customers &&
                      customers.map((customer) => (
                        <div key={customer.id}>{customer.customer_name}</div>
                      ))}
                  </div>
                </div>
                <div className="col-sm">
                  SĐT khách hàng:
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {!!customers &&
                      customers.map((customer) => (
                        <div key={customer.id}>{customer.customer_number}</div>
                      ))}
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
                    {!!customers &&
                      customers.map((customer) => (
                        <div key={customer.id}>{customer.province_name}</div>
                      ))}
                  </div>
                </div>
                <div className="col-sm">
                  Hình thức khách hàng:
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {!!customers &&
                      customers.map((customer) => (
                        <div key={customer.id}>
                          {customer.business_type_name}
                        </div>
                      ))}
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
                    {!!customers &&
                      customers.map((customer) => (
                        <div key={customer.id}>{customer.customer_address}</div>
                      ))}
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
                    {!!customers &&
                      customers.map((customer) => (
                        <input
                          key={customer.id}
                          type="customer_manager"
                          className="form-control"
                          name="customer_manager"
                          defaultValue={customer.customer_manager}
                          onChange={onChangeCustomer_manager}
                        />
                      ))}
                  </div>
                  <div className="col-sm">
                    SĐT người đại diện:
                    {!!customers &&
                      customers.map((customer) => (
                        <input
                          key={customer.id}
                          type="customer_manager_number"
                          className="form-control"
                          name="customer_manager_number"
                          defaultValue={customer.customer_manager_number}
                          onChange={onChangeCustomer_manager_Number}
                        />
                      ))}
                  </div>
                  <div className="col-sm">
                    Email người đại diện:
                    {!!customers &&
                      customers.map((customer) => (
                        <input
                          key={customer.id}
                          type="customer_manager_email"
                          className="form-control"
                          name="customer_manager_email"
                          defaultValue={customer.customer_manager_email}
                          onChange={onChangeCustomer_manager_Email}
                        />
                      ))}
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
