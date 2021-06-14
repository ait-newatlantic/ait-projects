import React, { useState, useRef, useEffect, useCallback } from "react";
import { Alert } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomerService from "../../services/customer.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../services/auth.service";
import ProvinceService from "../../services/province.service";
import BusinessTypeService from "../../services/business_type.service";

export default function DiaryInput() {
  const [customer_name, setCustomerName] = useState("");
  const [customer_number, setCustomer_Number] = useState("");
  const [customer_address, setCustomer_Address] = useState("");
  const [customer_manager, setCustomer_manager] = useState("");
  const [customer_manager_number, setCustomer_manager_Number] = useState("");
  const [customer_manager_email, setCustomer_manager_Email] = useState("");
  const [customer_taxcode, setCustomer_Taxcode] = useState("");
  const [business_typeId, setBusinessTypeId] = useState("");

  const [province_name, setProvinceName] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const form = useRef();
  const checkBtn = useRef();

  const [business_types, setBusinessTypes] = useState("");

  const onChangeCustomer = (e) => {
    const customer_name = e.target.value;
    setCustomerName(customer_name);
  };

  const onChangeCustomer_Number = (e) => {
    const customer_number = e.target.value;
    setCustomer_Number(customer_number);
  };

  const onChangeBusinessType = (e) => {
    const business_typeId = e.target.value;
    setBusinessTypeId(parseInt(business_typeId));
  };

  const onChangeCustomer_Address = (e) => {
    const customer_address = e.target.value;
    setCustomer_Address(customer_address);
  };

  const onChangeCustomer_Taxcode = (e) => {
    const customer_taxcode = e.target.value;
    setCustomer_Taxcode(customer_taxcode);
  };

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

  const Autofill = useCallback(() => {
    ProvinceService.get_province_by_name(province_name).then((response) => {
      response.data.forEach((value) => {
        setProvinceId(parseInt(value.province_id));
      });
    });
  }, [province_name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    const userId = parseInt(currentUser.id);
    if (checkBtn.current.context._errors.length === 0) {
      CustomerService.create_customer(
        customer_name,
        customer_number,
        customer_address,
        customer_manager,
        customer_manager_number,
        customer_manager_email,
        customer_taxcode,
        provinceId,
        userId,
        business_typeId
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

  const FetchProvince = () => {
    ProvinceService.get_provinces().then((response) => {
      setProvinces(response.data);
    });
  };

  const FetchBusinessType = () => {
    BusinessTypeService.get_business_types().then((response) => {
      setBusinessTypes(response.data);
      setBusinessTypeId(parseInt(response.data[0].business_type_id));
    });
  };

  useEffect(() => {
    FetchProvince();
    FetchBusinessType();
  }, []);

  useEffect(() => {
    Autofill();
  }, [province_name, Autofill]);

  return (
    <div>
      <div className="text-left">
        <h4 className="font-weight-bold text-secondary">
          TẠO BÁO CÁO HÀNG NGÀY
        </h4>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div className="text-left">
            <div>
              <div>
                <h6>Thông tin người nhập</h6>
                <div className="row ">
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
              <div>
                <h6>Nội dung báo cáo</h6>
                <div className="row ">
                  <div className="col-sm">
                    Nội dung:
                    <textarea className="form-control" rows="7"></textarea>
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
