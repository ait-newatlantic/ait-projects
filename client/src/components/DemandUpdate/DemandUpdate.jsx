import React, { useState, useEffect, useRef, useCallback } from "react";
import DemandService from "../../services/demand.service";
import ColorService from "../../services/color.services";
import DemandStatusService from "../../services/demand_status.service";
import DemandHistoryService from "../../services/demand_history.service";
import AuthService from "../../services/auth.service";

import CheckButton from "react-validation/build/button";
import { Alert, Button } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { FormHelperText } from "@material-ui/core";

export default function DemandUpdate(props) {
  const [demand_date, setDemandDate] = useState("");
  const [demand_date_2, setDemandDate_2] = useState("");
  const [demands, setDemands] = useState("");

  const [demand_note, setDemandNote] = useState(null);
  const [demand_note_2, setDemandNote_2] = useState(null);

  const [message, setMessage] = useState("");

  const [demand_status_name, setDemandStatusName] = useState("");
  const [demand_statuses, setDemandStatuses] = useState("");
  const [demand_meeting, setDemandMeeting] = useState("");
  const [demand_opinion, setDemandOpinion] = useState("");
  const [demand_status_id, setDemandStatusId] = useState(0);
  const [demand_status_id_2, setDemandStatusId_2] = useState(0);
  const [demand_employee, setDemandEmployee] = useState("");
  const [demand_quantity, setDemandQuantity] = useState(0);
  const [demand_id, setDemandId] = useState(0);

  const [user_id, setUserId] = useState(0);
  const [customer_id, setCustomerId] = useState(0);

  const [customer_type_name, setCustomerTypeName] = useState("");
  const [customer_type_id, setCustomerTypeId] = useState(0);

  const [contact_type_name, setContactTypeName] = useState("");
  const [contact_type_id, setContactTypeId] = useState(0);

  const [color_name, setColorName] = useState("");
  const [color_id, setColorId] = useState(0);
  const [color_id_2, setColorId_2] = useState(0);
  const [colors, setColors] = useState("");

  const [car_model_id, setCarModelId] = useState(0);
  const [car_type_id, setCarTypeId] = useState(0);

  const currentUser = AuthService.getCurrentUser();

  const [successful, setSuccessful] = useState(false);

  const form = useRef();
  const checkBtn = useRef();

  const onChangeColor = (e) => {
    const color_id = e.target.value;
    setColorId(parseInt(color_id));
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
    const demand_status_id = e.target.value;
    setDemandStatusId(parseInt(demand_status_id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    const id = atob(props.match.params.id);
    if (checkBtn.current.context._errors.length === 0) {
      DemandService.update_demand(
        id,
        demand_status_id,
        color_id,
        demand_date,
        demand_note
      );
      DemandHistoryService.create_demand_history(
        demand_date_2,
        user_id,
        demand_employee,
        car_model_id,
        car_type_id,
        demand_quantity,
        color_id_2,
        demand_status_id_2,
        customer_id,
        customer_type_id,
        demand_opinion,
        demand_meeting,
        contact_type_id,
        demand_note_2,
        demand_id
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

  const FetchDemands = () => {
    const id = atob(props.match.params.id);
    DemandService.get_specific_demand(id)
      .then((response) => {
        setDemands(response.data);
        setDemandStatusId(response.data[0].demand_status_id);
        setDemandStatusName(response.data[0].demand_status_name);
        setCustomerTypeId(response.data[0].customer_type_id);
        setCustomerTypeName(response.data[0].customer_type_name);
        setContactTypeId(response.data[0].contact_type_id);
        setContactTypeName(response.data[0].contact_type_name);
        setColorId(response.data[0].color_id);
        setColorName(response.data[0].color_name);
        setDemandDate(response.data[0].demand_date);
        setDemandNote(response.data[0].demand_note);
        setDemandMeeting(response.data[0].demand_meeting);
        setDemandOpinion(response.data[0].demand_opinion);
        setCarModelId(response.data[0].car_model_id);
        setCarTypeId(response.data[0].car_type_id);
        setUserId(response.data[0].user_id);
        setCustomerId(response.data[0].customer_id);
        setDemandEmployee(response.data[0].demand_employee);
        setDemandQuantity(response.data[0].demand_quantity);
        setDemandId(response.data[0].id);
        setColorId_2(response.data[0].color_id);
        setDemandStatusId_2(response.data[0].demand_status_id);
        setDemandDate_2(response.data[0].demand_date);
        setDemandNote_2(response.data[0].demand_note);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const FetchColors = () => {
    ColorService.get_colors().then((response) => {
      setColors(response.data);
    });
  };

  const FetchDemandStatuses = () => {
    DemandStatusService.get_demand_statuses().then((response) => {
      setDemandStatuses(response.data);
    });
  };

  useEffect(() => {
    FetchDemands();
    FetchColors();
    FetchDemandStatuses();
  }, []);

  return (
    <div>
      <div className="text-left">
        <h4 className="font-weight-bold text-secondary">CẬP NHẬT NHU CẦU</h4>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <div className="text-left">
              <div>
                <h6>Thông tin khách hàng</h6>
                <div className="row ">
                  <div className="col-sm">
                    Tên khách hàng :
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>{demand.customer_name}</div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm">
                    Giai đoạn:
                    {demand_status_id_2 == 9 || demand_status_id_2 == 10 ? (
                      <div>
                        <div
                          className="form-control"
                          style={{ overflow: "auto", background: "#e7e7e7" }}
                        >
                          {!!demands &&
                            demands.map((demand) => (
                              <div key={demand.id}>
                                {demand.demand_status_name}
                              </div>
                            ))}
                        </div>
                        <FormHelperText className="text-danger">
                          HOÀN TẤT GIAO DỊCH và GIAO DỊCH THẤT BẠI sẽ không thể
                          thay đổi sang giai đoạn khác
                        </FormHelperText>
                      </div>
                    ) : (
                      <Select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={onChangeDemandStatusId}
                      >
                        {!!demand_statuses &&
                          demand_statuses.map((demand_status) => (
                            <option
                              key={demand_status.demand_status_id}
                              value={demand_status.demand_status_id}
                            >
                              {demand_status_name} {"->"}{" "}
                              {demand_status.demand_status_name}
                            </option>
                          ))}
                      </Select>
                    )}
                  </div>
                  <div className="col-sm">
                    Loại khách hàng :
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>{demand.customer_type_name}</div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm">
                    Phương thức liên lạc :
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>{demand.contact_type_name}</div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="row ">
                  {customer_type_id == 3 ? (
                    <div className="col-sm">
                      Ý kiến khách hàng:
                      {!!demands &&
                        demands.map((demand) => (
                          <textarea
                            value={demand.demand_opinion}
                            className="form-control"
                            readOnly={true}
                            style={{ background: "#e7e7e7" }}
                            rows="3"
                            key={demand.id}
                          />
                        ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {contact_type_id == 3 ? (
                    <div className="col-sm">
                      Địa điểm giao dịch
                      {!!demands &&
                        demands.map((demand) => (
                          <textarea
                            value={demand.demand_meeting}
                            className="form-control"
                            readOnly={true}
                            style={{ background: "#e7e7e7" }}
                            rows="3"
                            key={demand.id}
                          />
                        ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="col-sm">
                    Ghi chú:
                    {!!demands &&
                      demands.map((demand) => (
                        <textarea
                          defaultValue={demand.demand_note}
                          className="form-control"
                          rows="3"
                          key={demand.id}
                          onChange={onChangeNote}
                        />
                      ))}
                    {demand_status_id == 10 ? (
                      <FormHelperText className="text-danger">
                        Xin vui lòng hãy ghi rõ lí do GIAO DỊCH THẤT BẠI
                      </FormHelperText>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div>
                <h6>Thông tin người nhập & ngày tháng</h6>
                <div className="row ">
                  <div className="col-sm">
                    Người nhập:
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>
                            {demand.username} - {demand.name}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm">
                    Người gặp khách hàng:
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>{demand.demand_employee}</div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm">
                    Ngày đạt được giai đoạn:
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
                <h6>Thông tin xe</h6>
                <div className="row ">
                  <div className="col-sm">
                    Model xe:
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>{demand.car_model_name}</div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm">
                    Loại xe:
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>{demand.car_type_name}</div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm">
                    Số lượng:
                    <div
                      className="form-control"
                      style={{ overflow: "auto", background: "#e7e7e7" }}
                    >
                      {!!demands &&
                        demands.map((demand) => (
                          <div key={demand.id}>{demand.demand_quantity}</div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm">
                    Màu xe:
                    <Select className="form-control" onChange={onChangeColor}>
                      {!!colors &&
                        colors.map((color) => (
                          <option key={color.color_id} value={color.color_id}>
                            {color_name} {"->"} {color.color_name}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
              </div>
              <br />
              <div>
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
