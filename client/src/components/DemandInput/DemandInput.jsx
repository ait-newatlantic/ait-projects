import React, { useState, useEffect, useRef, useCallback } from "react";
import DemandService from "../../services/demand.service";
import CustomerService from "../../services/customer.service";
import CustomerTypeService from "../../services/customer_type.service";
import ContactTypeService from "../../services/contact_type.service";
import AuthService from "../../services/auth.service";
import CarModelService from "../../services/car_model.service";
import CarTypeService from "../../services/car_type.service";
import ColorService from "../../services/color.services";
import DemandStatusService from "../../services/demand_status.service";
import * as MaterialUIIcons from "@material-ui/icons/";

import CheckButton from "react-validation/build/button";
import { Alert, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { Table } from "react-bootstrap";

export default function DemandInput(props) {
  const [demand_date, setDemandDate] = useState("");

  const [demand_employee, setDemandEmployee] = useState("");

  const [demand_quantity, setDemandQuantity] = useState(1);

  const [demand_opinion, setDemand_Opinion] = useState(null);
  const [demand_meeting, setDemandMeeting] = useState(null);
  const [demand_note, setDemandNote] = useState(null);

  const [message, setMessage] = useState("");

  const [demand_status_name, setDemandStatusName] = useState("");
  const [demand_statuses, setDemandStatuses] = useState("");
  const [demand_statusId, setDemandStatusId] = useState(0);

  const [customer_type_name, setCustomerTypeName] = useState("");
  const [customer_types, setCustomerTypes] = useState("");
  const [customer_typeId, setCustomerTypeId] = useState(0);

  const [contact_type_name, setContactTypeName] = useState("");
  const [contact_types, setContactTypes] = useState("");
  const [contact_typeId, setContactTypeId] = useState(0);

  const [car_model_name, setCarModelName] = useState("");
  const [car_models, setCarModels] = useState("");
  const [car_modelId, setCarModelId] = useState(0);

  const [car_type_name, setCarTypeName] = useState("");
  const [car_types, setCarTypes] = useState("");
  const [car_typeId, setCarTypeId] = useState(0);

  const [color_name, setColorName] = useState("");
  const [colors, setColors] = useState("");
  const [colorId, setColorId] = useState(0);

  const [customer_name, setCustomerName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [customerResult, setCustomerResult] = useState();

  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);

  const currentUser = AuthService.getCurrentUser();
  const userId = parseInt(currentUser.id);
  const user_name = currentUser.name;
  const [successful, setSuccessful] = useState(false);

  const form = useRef();
  const checkBtn = useRef();

  const addToList = () => {
    arr.push({
      demand_quantity,
      demand_date,
      demand_note,
      demand_employee,
      userId,
      customerId,
      customer_typeId,
      car_modelId,
      car_typeId,
      colorId,
      demand_statusId,
      contact_typeId,
      demand_meeting,
      demand_opinion,
    });
    arr2.push({
      demand_quantity,
      demand_date,
      demand_note,
      demand_employee,
      user_name,
      customer_name,
      customer_type_name,
      car_model_name,
      car_type_name,
      color_name,
      demand_status_name,
      contact_type_name,
      demand_meeting,
      demand_opinion,
    });
    setArr((prevArr) => [...prevArr]);
    setArr2((prevArr) => [...prevArr]);
  };

  const removeFromList = () => {
    arr.pop();
    setArr((prevArr) => [...prevArr]);
    arr2.pop();
    setArr2((prevArr) => [...prevArr]);
  };

  const onChangeQuantity = (e) => {
    const demand_quantity = e.target.value;
    setDemandQuantity(demand_quantity);
  };

  const onChangeDemandEmployee = (e) => {
    const demand_employee = e.target.value;
    setDemandEmployee(demand_employee);
  };

  const onChangeColor = (e) => {
    const colorId = e.target.value;
    setColorId(colorId);
    const color_name = e.target.options[e.target.selectedIndex].text;
    setColorName(color_name);
  };

  const onChangeDate = (e) => {
    const demand_date = e.target.value;
    setDemandDate(demand_date);
  };

  const onChangeNote = (e) => {
    const demand_note = e.target.value;
    setDemandNote(demand_note);
  };

  const onChangeDemandStatusId = (e) => {
    const demand_statusId = e.target.value;
    setDemandStatusId(demand_statusId);
    const demand_status_name = e.target.options[e.target.selectedIndex].text;
    setDemandStatusName(demand_status_name);
  };

  const onChangeCustomerType = (e) => {
    const customer_typeId = e.target.value;
    setCustomerTypeId(customer_typeId);
    const customer_type_name = e.target.options[e.target.selectedIndex].text;
    setCustomerTypeName(customer_type_name);
  };

  const onChangeCarType = (e) => {
    const car_typeId = e.target.value;
    setCarTypeId(car_typeId);
    const car_type_name = e.target.options[e.target.selectedIndex].text;
    setCarTypeName(car_type_name);
  };

  const onChangeContactType = (e) => {
    const contact_typeId = e.target.value;
    setContactTypeId(contact_typeId);
    const contact_type_name = e.target.options[e.target.selectedIndex].text;
    setContactTypeName(contact_type_name);
  };

  const onChangeCarModel = (e) => {
    const car_modelId = e.target.value;
    setCarModelId(car_modelId);
    const car_model_name = e.target.options[e.target.selectedIndex].text;
    setCarModelName(car_model_name);
  };

  const onChangeDemand_Opinion = (e) => {
    const demand_opinion = e.target.value;
    setDemand_Opinion(demand_opinion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      DemandService.create_demand(arr).then(
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

  // const Autofill = useCallback(() => {
  //   CustomerService.get_customer_by_name(customer_name).then((response) => {
  //     setCustomerResult(response.data);
  //     response.data.forEach((value) => {
  //       setCustomerId(value.id);
  //     });
  //   });
  // }, [customer_name]);

  const FetchCustomers = () => {
    const hide = 0;
    const order = "DESC";
    CustomerService.get_customers(hide, order).then((response) => {
      setCustomers(response.data);
    });
  };

  const FetchCustomerTypes = () => {
    CustomerTypeService.get_customer_types().then((response) => {
      setCustomerTypes(response.data);
      setCustomerTypeId(response.data[0].id);
      setCustomerTypeName(response.data[0].name);
    });
  };

  const FetchContactTypes = () => {
    ContactTypeService.get_contact_types().then((response) => {
      setContactTypes(response.data);
      setContactTypeId(response.data[0].contact_type_id);
      setContactTypeName(response.data[0].contact_type_name);
    });
  };

  const FetchCarModels = () => {
    CarModelService.get_car_models().then((response) => {
      setCarModels(response.data);
      setCarModelId(response.data[0].car_model_id);
      setCarModelName(response.data[0].car_model_name);
    });
  };

  const FetchCarTypes = () => {
    CarTypeService.get_car_types().then((response) => {
      setCarTypes(response.data);
      setCarTypeId(response.data[0].car_type_id);
      setCarTypeName(response.data[0].car_type_name);
    });
  };

  const FetchColors = () => {
    ColorService.get_colors().then((response) => {
      setColors(response.data);
      setColorId(response.data[0].color_id);
      setColorName(response.data[0].color_name);
    });
  };

  const FetchDemandStatuses = () => {
    DemandStatusService.get_demand_statuses().then((response) => {
      setDemandStatuses(response.data);
      setDemandStatusId(response.data[0].id);
      setDemandStatusName(response.data[0].name);
    });
  };

  useEffect(() => {
    FetchCustomers();
    FetchCarModels();
    FetchCarTypes();
    FetchColors();
    FetchDemandStatuses();
    FetchCustomerTypes();
    FetchContactTypes();
  }, [customer_name]);

  return (
    <div>
      <div className="text-left">
        <h4 className="font-weight-bold text-dark">TẠO NHU CẦU MỚI</h4>
        <h6 className="flex d-flex wrap font-weight-bold text-secondary">
          Form tạo nhu cầu mua xe của khách hàng
        </h6>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <div className="text-left">
              <h6>Thông tin khách hàng</h6>
              <div className="row">
                <div className="col-sm">
                  Tên khách hàng :
                  <Autocomplete
                    style={{ background: "white" }}
                    size="small"
                    disableClearable
                    value={customer_name}
                    onChange={(event, newValue) => {
                      setCustomerName(newValue);
                    }}
                    options={customers.map((option) => option.name)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </div>
                <div className="col-sm">
                  Loại khách hàng :
                  <Select
                    className="form-control"
                    id="exampleFormControlSelect2"
                    onChange={onChangeCustomerType}
                  >
                    {!!customer_types &&
                      customer_types.map((customer_type) => (
                        <option key={customer_type.id} value={customer_type.id}>
                          {customer_type.name}
                        </option>
                      ))}
                  </Select>
                </div>
                <div className="col-sm">
                  Phương thức liên lạc :
                  <Select
                    className="form-control"
                    id="exampleFormControlSelect3"
                    onChange={onChangeContactType}
                  >
                    {!!contact_types &&
                      contact_types.map((contact_type) => (
                        <option key={contact_type.id} value={contact_type.id}>
                          {contact_type.name}
                        </option>
                      ))}
                  </Select>
                </div>
                <div className="col-sm">
                  Giai đoạn :
                  <Select
                    className="form-control"
                    id="exampleFormControlSelect5"
                    onChange={onChangeDemandStatusId}
                  >
                    {!!demand_statuses &&
                      demand_statuses.map((demand_status) => (
                        <option
                          key={demand_status.demand_status_id}
                          value={demand_status.demand_status_id}
                        >
                          {demand_status.name}
                        </option>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="row">
                {customer_typeId == 3 ? (
                  <div className="col-sm">
                    Ý kiến khách hàng
                    <textarea
                      type="demand_opinion"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={onChangeDemand_Opinion}
                    ></textarea>
                  </div>
                ) : (
                  <div></div>
                )}
                {contact_typeId == 3 ? (
                  <div className="col-sm">
                    Địa điểm giao dịch
                    <textarea
                      type="demand_meeting"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => setDemandMeeting(e.target.value)}
                    ></textarea>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="col-sm">
                  Ghi chú:
                  <textarea
                    type="demand_note"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={onChangeNote}
                  ></textarea>
                </div>
              </div>
            </div>
            <br />
            <div className="text-left">
              <h6>Thông tin người nhập & ngày tháng</h6>
              <div className="row ">
                <div className="col-sm">
                  Người nhập:
                  <div
                    className="form-control"
                    style={{ background: "#e7e7e7" }}
                  >
                    {currentUser.name}
                  </div>
                </div>
                <div className="col-sm">
                  Người gặp khách hàng:
                  <Input
                    type="demand_employee"
                    className="form-control"
                    name="demand_employee"
                    value={demand_employee}
                    onChange={onChangeDemandEmployee}
                  />
                </div>
                <div className="col-sm">
                  Ngày - {demand_status_name}:
                  <Input
                    type="date"
                    className="form-control"
                    name="demand_date"
                    value={demand_date}
                    onChange={onChangeDate}
                  />
                </div>
              </div>
            </div>
            <br />
            <div>
              <h6 className="text-left">Danh sách xe khách hàng quan tâm</h6>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      Model xe
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect4"
                        onChange={onChangeCarModel}
                      >
                        {!!car_models &&
                          car_models.map((car_model) => (
                            <option
                              key={car_model.car_model_id}
                              value={car_model.car_model_id}
                            >
                              {car_model.car_model_name}
                            </option>
                          ))}
                      </Select>
                    </th>
                    <th>
                      Loại xe
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect6"
                        onChange={onChangeCarType}
                      >
                        {!!car_types &&
                          car_types.map((car_type) => (
                            <option
                              key={car_type.car_type_id}
                              value={car_type.car_type_id}
                            >
                              {car_type.car_type_name}
                            </option>
                          ))}
                      </Select>
                    </th>
                    <th>
                      Số lượng
                      <Input
                        type="number"
                        className="form-control"
                        name="demand_quantity"
                        value={demand_quantity}
                        onChange={onChangeQuantity}
                      />
                    </th>
                    <th>
                      Màu xe
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect7"
                        onChange={onChangeColor}
                      >
                        {!!colors &&
                          colors.map((color) => (
                            <option key={color.color_id} value={color.color_id}>
                              {color.color_name}
                            </option>
                          ))}
                      </Select>
                    </th>
                    <th>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={addToList}
                      >
                        Thêm
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@fat</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={removeFromList}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={removeFromList}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <br />
            <div className="text-left">
              <Button
                className="btn-sm"
                variant="warning"
                type="submit"
                onClick={handleSubmit}
              >
                GỬI FORM
              </Button>
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
