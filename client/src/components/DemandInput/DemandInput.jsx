import React, { useState, useEffect, useRef, useCallback } from "react";

//Libraries
import CheckButton from "react-validation/build/button";
import { Alert, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { Table } from "react-bootstrap";

//Services
import DemandService from "../../services/demand.service";
import CustomerService from "../../services/customer.service";
import CustomerTypeService from "../../services/customer_type.service";
import ContactTypeService from "../../services/contact_type.service";
import AuthService from "../../services/auth.service";
import CarModelService from "../../services/car_model.service";
import CarTypeService from "../../services/car_type.service";
import ColorService from "../../services/color.services";
import DemandStatusService from "../../services/demand_status.service";
import UserService from "../../services/user.service";

export default function DemandInput(props) {
  const [date, setDemandDate] = useState("");

  const [User, setUser] = useState("");

  const [username, setUserName] = useState("");

  const [branch_name, setBranchName] = useState("");

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

  const isInitialMount = useRef(true);

  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);

  const currentUser = AuthService.getCurrentUser();
  const userId = parseInt(currentUser.id);
  const user_name = currentUser.name;
  const [successful, setSuccessful] = useState(false);

  const form = useRef();
  const checkBtn = useRef();

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const addToList = () => {
    arr.push({
      demand_quantity,
      date,
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
      date,
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
    const date = e.target.value;
    setDemandDate(date);
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

  const Autofill = useCallback(() => {
    CustomerService.get_customer_by_name(customer_name).then((response) => {
      setCustomerResult(response.data);
      response.data.forEach((value) => {
        setCustomerId(value.id);
      });
    });
  }, [customer_name]);

  const FetchCustomers = useCallback(() => {
    const hide = 0;
    const order = "DESC";
    CustomerService.get_customers(username, branch_name, hide, order).then(
      (response) => {
        setCustomers(response.data);
      }
    );
  }, [username, branch_name]);

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
      setContactTypeId(response.data[0].id);
      setContactTypeName(response.data[0].name);
    });
  };

  const FetchCarModels = () => {
    CarModelService.get_car_models().then((response) => {
      setCarModels(response.data);
      setCarModelId(response.data[0].id);
      setCarModelName(response.data[0].name);
    });
  };

  const FetchCarTypes = () => {
    CarTypeService.get_car_types().then((response) => {
      setCarTypes(response.data);
      setCarTypeId(response.data[0].id);
      setCarTypeName(response.data[0].name);
    });
  };

  const FetchColors = () => {
    ColorService.get_colors().then((response) => {
      setColors(response.data);
      setColorId(response.data[0].id);
      setColorName(response.data[0].name);
    });
  };

  const FetchDemandStatuses = () => {
    DemandStatusService.get_demand_statuses().then((response) => {
      setDemandStatuses(response.data);
      setDemandStatusId(response.data[0].id);
      setDemandStatusName(response.data[0].name);
    });
  };

  const getUser = useCallback(() => {
    UserService.get_user(currentUser.id).then((response) => {
      setUser(response.data);
      if (response.data.Roles[0].id === 4) {
        //User is an employee
        setUserName(response.data.username);
        setBranchName(response.data.Branch.name);
      } else if (response.data.Roles[0].id === 2) {
        //User is an moderator
        setBranchName(response.data.Branch.name);
      } else {
        FetchCustomers();
      }
    });
  }, [currentUser.id, FetchCustomers]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Your useEffect code here to be run on initial render
      getUser();
      Autofill();
      FetchCarModels();
      FetchCarTypes();
      FetchColors();
      FetchDemandStatuses();
      FetchCustomerTypes();
      FetchContactTypes();
    } else {
      // Your useEffect code here to be run on update
      FetchCustomers();
      Autofill();
    }
  }, [getUser, Autofill, FetchCustomers]);

  return (
    <div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <div className="row">
              <div className="col-sm">
                <div className="form-group card p-2">
                  <h6 className="font-weight-bold text-center">
                    THÔNG TIN KHÁCH HÀNG
                  </h6>
                  <div className="row text-left">
                    <div className="col-sm">
                      <label>Tên khách hàng *</label>
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
                      <label>Loại khách hàng *</label>
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        onChange={onChangeCustomerType}
                      >
                        {!!customer_types &&
                          customer_types.map((Customer_Type) => (
                            <option
                              key={Customer_Type.id}
                              value={Customer_Type.id}
                            >
                              {Customer_Type.name}
                            </option>
                          ))}
                      </Select>
                    </div>
                    <div className="col-sm">
                      <label>Cách liên lạc *</label>
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect3"
                        onChange={onChangeContactType}
                      >
                        {!!contact_types &&
                          contact_types.map((Contact_Type) => (
                            <option
                              key={Contact_Type.id}
                              value={Contact_Type.id}
                            >
                              {Contact_Type.name}
                            </option>
                          ))}
                      </Select>
                    </div>
                    <div className="col-sm">
                      <label>Giai đoạn *</label>
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect5"
                        onChange={onChangeDemandStatusId}
                      >
                        {!!demand_statuses &&
                          demand_statuses.map((Demand_Status) => (
                            <option
                              key={Demand_Status.id}
                              value={Demand_Status.id}
                            >
                              {Demand_Status.name}
                            </option>
                          ))}
                      </Select>
                    </div>
                    <div className="col-sm">
                      <label>Ngày giai đoạn *</label>
                      <Input
                        type="date"
                        className="form-control"
                        name="date"
                        value={date}
                        onChange={onChangeDate}
                        validations={[required]}
                      />
                    </div>
                  </div>
                  <div className="row text-left">
                    {customer_typeId == 3 ? (
                      <div className="col-sm">
                        <label>Ý kiến khách hàng</label>
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
                        <label>Địa điểm giao dịch</label>
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
                      <label>Tình hình hiện nay *</label>
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
              </div>
              <div className="col-sm">
                <div className="form-group card p-2">
                  <h6 className="font-weight-bold text-center">
                    THÔNG TIN VỀ NHÂN VIÊN
                  </h6>
                  <div className="row text-left">
                    <div className="col-sm">
                      <label>Người nhập</label>
                      <div
                        className="form-control"
                        style={{ background: "#e7e7e7" }}
                      >
                        {currentUser.name}
                      </div>
                    </div>
                    <div className="col-sm">
                      <label>Người gặp khách hàng *</label>
                      <Input
                        type="demand_employee"
                        className="form-control"
                        name="demand_employee"
                        value={demand_employee}
                        onChange={onChangeDemandEmployee}
                        validations={[required]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group card p-2">
              <h6 className="font-weight-bold text-center">
                DANH SÁCH XE KHÁCH HÀNG QUAN TÂM
              </h6>
              <Table striped bordered hover responsive size="sm">
                <thead>
                  <tr>
                    <th className="align-middle">#</th>
                    <th className="align-middle">Tên khách hàng</th>
                    <th className="align-middle">Loại khách khách hàng</th>
                    <th className="align-middle">Cách liên lạc</th>
                    <th className="align-middle">Giai đoạn</th>
                    <th className="align-middle">Ngày giai đoạn</th>
                    <th className="align-middle">Tình hình hiện nay</th>
                    <th className="align-middle">ý kiến khách hàng</th>
                    <th className="align-middle">Địa điểm giao dịch</th>
                    <th>
                      Model xe
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect4"
                        onChange={onChangeCarModel}
                      >
                        {!!car_models &&
                          car_models.map((Car_Model) => (
                            <option key={Car_Model.id} value={Car_Model.id}>
                              {Car_Model.name}
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
                          car_types.map((Car_Type) => (
                            <option key={Car_Type.id} value={Car_Type.id}>
                              {Car_Type.name}
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
                        validations={[required]}
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
                          colors.map((Color) => (
                            <option key={Color.id} value={Color.id}>
                              {Color.name}
                            </option>
                          ))}
                      </Select>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arr2.map((result, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{result.customer_name}</td>
                      <td>{result.customer_type_name}</td>
                      <td>{result.contact_type_name}</td>
                      <td>{result.demand_status_name}</td>
                      <td>{result.date}</td>
                      <td>{result.demand_note}</td>
                      <td>{result.demand_opinion}</td>
                      <td>{result.demand_meeting}</td>
                      <td>{result.car_model_name}</td>
                      <td>{result.car_type_name}</td>
                      <td>{result.demand_quantity}</td>
                      <td>{result.color_name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div
                className="d-flex justify-content-around"
                style={{ background: "#e7e7e7" }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addToList}
                >
                  Thêm xe vào danh sách
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={removeFromList}
                >
                  Xóa xe cuối danh sách
                </button>
              </div>
            </div>
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
