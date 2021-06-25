import React, { useState, useEffect, useRef } from "react";
import DemandService from "../../services/demand.service";
import DemandHistoryService from "../../services/demand_history.service";
import AuthService from "../../services/auth.service";
import DemandStatusService from "../../services/demand_status.service";
import ColorService from "../../services/color.services";

import { Alert } from "react-bootstrap";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

export default function DemandUpdate(props) {
  const [demands, setDemands] = useState(null);

  const [arr, setArr] = useState([]);

  const [demand_status, setDemandStatus] = useState(0);
  const [demand_status_name, setDemandStatusName] = useState("");
  const [demand_statuses, setDemandStatuses] = useState("");

  const [color, setColor] = useState(0);
  const [color_name, setColorName] = useState("");
  const [colors, setColors] = useState("");

  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    const id = atob(props.match.params.id);
    if (checkBtn.current.context._errors.length === 0) {
      DemandService.update_demand(id, demand_status, date, note, color);
      DemandHistoryService.create_demand_history(arr).then(
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

  const FetchDemandStatuses = () => {
    DemandStatusService.get_demand_statuses().then((response) => {
      setDemandStatuses(response.data);
    });
  };

  const FetchColors = () => {
    ColorService.get_colors().then((response) => {
      setColors(response.data);
    });
  };

  const FetchDemands = () => {
    const id = atob(props.match.params.id);
    DemandService.get_demand(id)
      .then((response) => {
        setDemands(response.data);
        setDemandStatusName(response.data.demand_status.name);
        setDemandStatus(response.data.demand_status.id);
        setDate(response.data.date);
        setNote(response.data.note);
        setColor(response.data.color.id);
        setColorName(response.data.color.name);
        setArr(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    FetchDemands();
    FetchDemandStatuses();
    FetchColors();
  }, []);

  return demands ? (
    <div>
      <div className="text-left">
        <h4 className="font-weight-bold text-dark">
          CẬP NHẬT NHU CẦU MUA XE CỦA KHÁCH HÀNG
        </h4>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div className="text-left">
            <div className="row">
              <div className="col-sm">
                <div className="form-group border rounded border-secondary p-2">
                  <h6 className="font-weight-bold text-center">
                    THÔNG TIN KHÁCH HÀNG
                  </h6>
                  <div className="row">
                    <div className="col-sm">
                      <label>Tên khách hàng:</label>
                      <div
                        className="form-control"
                        style={{ overflow: "auto", background: "#e7e7e7" }}
                      >
                        {demands.customer.name}
                      </div>
                    </div>
                    <div className="col-sm">
                      <label>Giai đoạn:</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect5"
                        onChange={(e) => {
                          setDemandStatus(e.target.value);
                        }}
                      >
                        {!!demand_statuses &&
                          demand_statuses.map((demand_status) => (
                            <option
                              key={demand_status.id}
                              value={demand_status.id}
                            >
                              {demand_status_name} {">>"} {demand_status.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-sm">
                      <label>Ngày giai đoạn</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Tình hình hiện nay</label>
                    <textarea
                      type="demand_note"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                    >
                      {demands.note}
                    </textarea>
                  </div>
                </div>
                <div className="form-group border rounded border-secondary p-2">
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
                      <div
                        className="form-control"
                        style={{ overflow: "auto", background: "#e7e7e7" }}
                      >
                        {demands.employee}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-group border rounded border-secondary p-2">
                  <h6 className="font-weight-bold text-center">THÔNG TIN XE</h6>
                  <div className="row">
                    <div className="col-sm">
                      <label>Model xe</label>
                      <div
                        className="form-control"
                        style={{ overflow: "auto", background: "#e7e7e7" }}
                      >
                        {demands.car_model.name}
                      </div>
                    </div>
                    <div className="col-sm">
                      <label>Màu xe</label>
                      <div
                        className="form-control"
                        style={{ overflow: "auto", background: "#e7e7e7" }}
                      >
                        {demands.car_type.name}
                      </div>
                    </div>
                    <div className="col-sm">
                      <label>Số lượng</label>
                      <div
                        className="form-control"
                        style={{ overflow: "auto", background: "#e7e7e7" }}
                      >
                        {demands.quantity}
                      </div>
                    </div>
                    <div className="col-sm">
                      <label>Màu xe</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect7"
                        onChange={(e) => {
                          setColor(e.target.value);
                        }}
                      >
                        {!!colors &&
                          colors.map((color) => (
                            <option key={color.id} value={color.id}>
                              {color_name} {">>"} {color.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  ) : (
    <div></div>
  );
}
