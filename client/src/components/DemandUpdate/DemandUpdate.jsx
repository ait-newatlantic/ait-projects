import React, { useState, useEffect, useRef } from 'react'
import { Alert, Button } from "react-bootstrap";
import DemandService from "../../services/demand.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import UpdateIcon from '@material-ui/icons/Update';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import UserService from "../../services/user.service";
import "./style.css"

export default function DemandUpdate(props) {
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [color, setColor] = useState("");
    const [ait, setAit] = useState(null);
    const [kmt, setKmt] = useState(null);
    const [note, setNote] = useState(null);
    const [id, setId] = useState("");
    const [content, setContent] = useState("");

    const [demands, setDemands] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();


    const onChangeDate = (e) => {
        const date = e.target.value;
        setDate(date);
    };

    const onChangeColor = (e) => {
        const color = e.target.value;
        setColor(color);
    };

    const onChangeStatus = (e) => {
        const status = e.target.value;
        setStatus(status);
    };

    const onChangeNote = (e) => {
        const note = e.target.value;
        setNote(note);
    };

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setId(props.match.params.id)
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            DemandService.update_specific_demand(
                id,
                parseInt(ait),
                parseInt(kmt),
                date,
                note,
                status,
                color,
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

    const FetchData = id => {
        DemandService.get_specific_demand(id)
            .then(response => {
                setDemands(response.data);
                setId(props.match.params.id)
                setDate(response.data.date);
                setAit(response.data.ait);
                setKmt(response.data.kmt);
                setStatus(response.data.status);
                setNote(response.data.note);
                setColor(response.data.color);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    useEffect(() => {
        FetchData(props.match.params.id)
        return () => {
        }
    }, [props.match.params.id])

    return (
        <div className="custom">
            { content == "Nhân viên" ?
                <div>
                    <div className="card-header text-white" style={{ backgroundColor: "#24305E" }}>
                        CẬP NHẬT NHU CẦU THỰC TẾ
                        </div>
                    <Form onSubmit={handleRegister} ref={form}>
                        {!successful && (
                            <div>
                                <div className="card-group">
                                    <div className="card">
                                        <div className="card-body" >
                                            <h6><strong>Thông tin khách hàng</strong></h6>
                                            <div className="row">
                                                <label className="col-lg-4">Tên KH: </label>
                                                <div className="col-sm">
                                                    <p className="form-control" style={{ overflow: "auto" }}>{demands.customer}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-lg-4" >SĐT KH:</label>
                                                <div className="col-sm">
                                                    <p className="form-control">{demands.customer_number}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-lg-4">Khu vực KH:</label>
                                                <div className="col-sm">
                                                    <input type="customer_area" className="form-control" defaultValue={demands.customer_area} id="exampleFormControlInput1" />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <label className="col-lg-4" >Giai đoạn</label>
                                                <div className="col-sm">
                                                    <Select className="form-control" id="exampleFormControlSelect1" style={{ background: "#add8e6" }} onChange={onChangeStatus}>
                                                        <option defaultValue={demands.status} >{demands.status}</option>
                                                        <option defaultValue="TIẾP CẬN CHÀO HÀNG">TIẾP CẬN CHÀO HÀNG</option>
                                                        <option defaultValue="CHẠY THỬ">CHẠY THỬ</option>
                                                        <option defaultValue="ĐÀM PHÁN">ĐÀM PHÁN</option>
                                                        <option defaultValue="CHỐT ĐƠN HÀNG">CHỐT ĐƠN HÀNG</option>
                                                        <option defaultValue="ĐÃ CỌC">ĐÃ CỌC</option>
                                                        <option defaultValue="LÊN HỢP ĐỒNG">LÊN HỢP ĐỒNG</option>
                                                        <option defaultValue="ĐÃ THANH TOÁN TẠM ỨNG">ĐÃ THANH TOÁN TẠM ỨNG</option>
                                                        <option defaultValue="HOÀN TẤT GIAO DỊCH">HOÀN TẤT GIAO DỊCH</option>
                                                        <option defaultValue="BÀN GIAO CHƯA THANH TOÁN">BÀN GIAO CHƯA THANH TOÁN</option>
                                                        <option defaultValue="GIAO DỊCH THẤT BẠI">GIAO DỊCH THẤT BẠI</option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <label className="col-lg-4" >Loại KH: </label>
                                                <div className="col-sm">
                                                    <input type="customer_type" className="form-control" defaultValue={demands.customer_type} id="exampleFormControlInput1" />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row" id="ykien-customers">
                                                <label className="col-lg-4">Ý kiến KH: </label>
                                                <div className="col-sm">
                                                    <textarea type="customer_opinion"
                                                        className="form-control"
                                                        id="exampleFormControlTextarea1"
                                                        defaultValue={demands.customer_opinion}
                                                        rows="3"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <label className="col-lg-4" >Phương thức liên lạc:</label>
                                                <div className="col-sm">
                                                    <Select className="form-control" id="exampleFormControlSelect1">
                                                        <option defaultValue="" >{demands.customer_communication}</option>
                                                        {/* <option defaultValue="GẶP TRỰC TIẾP">GẶP TRỰC TIẾP</option>
                                            <option defaultValue="QUA ĐIỆN THOẠI">QUA ĐIỆN THOẠI</option>
                                            <option defaultValue="QUA EMAIL/CHAT(ZALO,...)">QUA EMAIL/CHAT(ZALO,...)</option> */}
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <label className="col-lg-4">Địa điểm giao dịch: </label>
                                                <div className="col-sm">
                                                    <textarea type="customer_meeting"
                                                        className="form-control"
                                                        id="exampleFormControlTextarea1"
                                                        defaultValue={demands.customer_meeting}
                                                        rows="3"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body" >
                                            <h6><strong>Thông tin xe</strong></h6>
                                            <div className="row">
                                                <label className="col-lg-4">Model xe: </label>
                                                <div className="col-sm">
                                                    <p className="form-control">{demands.model} </p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-lg-4">Loại xe: </label>
                                                <div className="col-sm">
                                                    <p className="form-control">{demands.type} </p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-lg-4" >Số lượng: </label>
                                                <div className="col-sm">
                                                    <input
                                                        type="quantity"
                                                        className="form-control"
                                                        defaultValue={demands.quantity}
                                                        id="exampleFormControlInput1" />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <label className="col-lg-4">Màu xe: </label>
                                                <div className="col-sm">
                                                    <Select className="form-control" id="exampleFormControlSelect1" onChange={onChangeColor} style={{ background: "#add8e6" }}>
                                                        <option defaultValue={demands.color}>{demands.color}</option>
                                                        <option defaultValue="Cam">Cam</option>
                                                        <option defaultValue="Trắng">Trắng</option>
                                                        <option defaultValue="Vàng">Vàng</option>
                                                        <option defaultValue="Xanh">Xanh</option>
                                                        <option defaultValue="Xanh quân đội">Xanh quân đội</option>
                                                        <option defaultValue="Đỏ">Đỏ</option>
                                                        <option defaultValue="Chưa quyết định">Chưa quyết định</option>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body" >
                                            <h6><strong>Thông tin người nhập & ngày tháng</strong></h6>
                                            <div className="row">
                                                <label className="col-lg-4" >Người nhập: </label>
                                                <div className="col-sm">
                                                    <p className="form-control">{demands.employee}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-lg-4" >Người gặp KH: </label>
                                                <div className="col-sm">
                                                    <p className="form-control">{demands.employee_field}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-lg-4" >Ngày gặp KH:</label>
                                                <div className="col-sm">
                                                    <Input
                                                        type="date"
                                                        style={{ background: "#add8e6" }}
                                                        className="form-control"
                                                        name="date"
                                                        onChange={onChangeDate}
                                                        validations={[required]}
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <label className="col-lg-4">Ghi chú :</label>
                                                <div className="col-sm">
                                                    <textarea type="note"
                                                        className="form-control"
                                                        id="exampleFormControlTextarea1"
                                                        defaultValue={demands.note}
                                                        rows="3"
                                                        style={{ background: "#add8e6" }}
                                                        onChange={onChangeNote}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="text-right">
                                    <Button variant="success" type="submit" onClick={handleRegister}>
                                        CẬP NHẬT <UpdateIcon />
                                    </Button>
                                </div>
                            </div>
                        )}
                        {message && (
                            <div className="form-group">
                                <div className="card card-body">
                                    <div
                                        className={successful ? "alert alert-success" : "alert alert-danger"}
                                        role="alert"
                                    >
                                        <Alert key={message.message}>
                                            <Alert.Heading>{message.heading}</Alert.Heading>
                                            <p>
                                                {message.message}
                                            </p>
                                        </Alert>
                                    </div>
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
                :
                <div>{content}</div>
            }
        </div>
    )
}


