import React, { useState, useEffect, useRef } from 'react'
import { Button } from "react-bootstrap";
import logo from "../../../static/imgs/ait_logo.jpg"
import DemandService from "../../../services/demand.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';


export default function CN_NCTT(props) {
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [color, setColor] = useState("");
    const [ait, setAit] = useState(null);
    const [kmt, setKmt] = useState(null);
    const [note, setNote] = useState(null);
    const [id, setId] = useState("");

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

    const onChangeAit = (e) => {
        const ait = e.target.value;
        setAit(ait);
    };

    const onChangeKmt = (e) => {
        const kmt = e.target.value;
        setKmt(kmt);
    };

    const onChangeNote = (e) => {
        const note = e.target.value;
        setNote(note);
    };

    const validAit = (value) => {
        if (value < 0) {
            return (
                <div className="alert alert-danger" role="alert">
                    The input type should not be empty, a string or a negative number.
                </div>
            );
        }
    };

    const validKmt = (value) => {
        if (value < 0) {
            return (
                <div className="alert alert-danger" role="alert">
                    The input type should not be empty, a string or a negative number.
                </div>
            );
        }
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

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    // const Submit = () => {
    //     api.put("/api/update/demands", {
    //         id: props.match.params.id,
    //         color: color,
    //         date: date,
    //         status: status,
    //         ait: ait,
    //         kmt: kmt,
    //         note: note,
    //     }).then((response) => {
    //         console.log(response.data)
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }

    const FetchData = id => {
        DemandService.get_specific_demand(id)
            .then(response => {
                setDemands(response.data);
                setId(demands.id)
                setDate(demands.date);
                setAit(demands.ait);
                setKmt(demands.kmt);
                setStatus(demands.status);
                setNote(demands.note);
                setColor(demands.color);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        FetchData(props.match.params.id)
        return () => {
        }
    }, [props.match.params.id])

    return (
        <div className="container p-3 my-3 border border-dark">
            <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                        <div>
                            <div className="head">
                                <img src={logo} alt="logo" width="100" height="100" />
                                <h1>FORM CẬP NHẬT NHU CẦU THỰC TẾ</h1>
                            </div>

                            <div className="container p-3 my-3 border border-dark" >
                                <p><strong>Thông tin khách hàng</strong></p>
                                <div className="row">

                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1">Tên khách hàng</label>
                                        <div className="row">
                                            <div className="col-sm">
                                                <input type="customer" className="form-control" defaultValue={demands.customer} id="exampleFormControlInput1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlInput1" >SĐT khách hàng</label>
                                        <input type="customer_number" className="form-control" defaultValue={demands.customer_number} id="exampleFormControlInput1" />
                                    </div>

                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1">Khu vực khách hàng</label>
                                        <input type="customer_area" className="form-control" defaultValue={demands.customer_area} id="exampleFormControlInput1" />
                                    </div>

                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1" >Giai đoạn</label>
                                        <Select className="form-control" id="exampleFormControlSelect1" style={{ background: "#add8e6" }} onChange={onChangeStatus}>
                                            <option defaultValue={demands.status} selected disabled hidden>{demands.status}</option>
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

                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1" >Loại khách hàng</label>
                                        <input type="customer_type" className="form-control" defaultValue={demands.customer_type} id="exampleFormControlInput1" />
                                        <HtmlTooltip
                                            title={
                                                <React.Fragment>
                                                    <Typography color="inherit"><strong>GIẢI THÍCH LOẠI KHÁCH HÀNG</strong></Typography>
                                                    <b>{'DỰ KIẾN: '}</b>{"chỉ mới tiếp cận và chào hàng"}.{' '}
                                                    <b>{'TIỀM NĂNG: '}</b>{"Họ có nhu cầu và dự định sử dụng sản phẩm của mình, sau khi được chào hàng"}.{' '}
                                                    <b>{'ĐÃ SỬ DỤNG KAMAZ: '}</b>{"Khách hàng đã và đang sử dụng sản phẩm của mình"}.{' '}
                                                </React.Fragment>
                                            }
                                        >
                                            <IconButton aria-label="info">
                                                <InfoIcon />
                                            </IconButton>
                                        </HtmlTooltip>
                                    </div>
                                    <div className="col-sm-9" id="ykien-customers">
                                        <label htmlFor="exampleFormControlTextarea1">Ý kiến khách hàng (Đối với khách hàng đã sử dụng xe Kamaz)</label>
                                        <textarea type="customer_opinion"
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            defaultValue={demands.customer_opinion}
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1" >Phương thức liên lạc</label>
                                        <Select className="form-control" id="exampleFormControlSelect1">
                                            <option defaultValue="" selected disabled hidden>{demands.customer_communication}</option>
                                            <option defaultValue="GẶP TRỰC TIẾP">GẶP TRỰC TIẾP</option>
                                            <option defaultValue="QUA ĐIỆN THOẠI">QUA ĐIỆN THOẠI</option>
                                            <option defaultValue="QUA EMAIL/CHAT(ZALO,...)">QUA EMAIL/CHAT(ZALO,...)</option>
                                        </Select>
                                    </div>
                                    <div className="col-sm-9" id="diadiem-giaodich">
                                        <label htmlFor="exampleFormControlTextarea1">Địa điểm giao dịch (Đối với trường hợp gặp trực tiếp)</label>
                                        <textarea type="customer_meeting"
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            defaultValue={demands.customer_meeting}
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="container p-3 my-3 border border-dark" >
                                <p><strong>Thông tin xe</strong></p>
                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1">Model xe</label>
                                        <input type="model" className="form-control" defaultValue={demands.model} id="exampleFormControlInput1" />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1">Loại xe</label>
                                        <input type="type" className="form-control" defaultValue={demands.type} id="exampleFormControlInput1" />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlInput1" >Số lượng</label>
                                        <input
                                            type="quantity"
                                            className="form-control"
                                            defaultValue={demands.quantity}
                                            id="exampleFormControlInput1" />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1">Màu yêu cầu</label>
                                        <Select className="form-control" id="exampleFormControlSelect1" onChange={onChangeColor} style={{ background: "#add8e6" }}>
                                            <option defaultValue={demands.color} selected disabled hidden >{demands.color}</option>
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

                            <div className="container p-3 my-3 border border-dark" >
                                <p><strong>Thông tin nhân viên & ngày tháng</strong></p>
                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlInput1" >Người nhập</label>
                                        <input type="employee" defaultValue={demands.employee} className="form-control" id="exampleFormControlInput1" />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlInput1" >Người đi thực tế</label>
                                        <input type="employee_field" defaultValue={demands.employee_field} className="form-control" id="exampleFormControlInput1" />
                                    </div>

                                    <div className="col-sm">
                                        <label htmlFor="example-date-input" >Ngày đi thực tế</label>
                                        <Input
                                            type="date"
                                            style={{ background: "#add8e6" }}
                                            className="form-control"
                                            name="date"
                                            value={date}
                                            onChange={onChangeDate}
                                            validations={[required]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="container p-3 my-3 border border-dark" >
                                <p><strong>Thông tin thêm</strong></p>
                                <div className="row">
                                    <div className="col">
                                        <div className="demands-group">
                                            <label htmlFor="exampleFormControlInput1" >AIT</label>
                                            <Input
                                                style={{ background: "#add8e6" }}
                                                type="number"
                                                className="form-control"
                                                name="ait"
                                                value={demands.ait}
                                                onChange={onChangeAit}
                                                validations={[validAit]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="demands-group">
                                            <label htmlFor="exampleFormControlInput1" >KMT</label>
                                            <Input
                                                style={{ background: "#add8e6" }}
                                                type="number"
                                                className="form-control"
                                                name="kmt"
                                                value={demands.kmt}
                                                onChange={onChangeKmt}
                                                validations={[validKmt]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container p-3 my-3 border border-dark" >
                                <label htmlFor="exampleFormControlTextarea1"><strong>Ghi chú</strong></label>
                                <textarea type="note"
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    placeholder={demands.note}
                                    rows="3"
                                    style={{ background: "#add8e6" }}
                                    onChange={onChangeNote}
                                ></textarea>
                            </div>

                            <div className="container p-3 my-3 border border-dark" >
                                <label htmlFor="exampleInputFile">Upload ảnh</label>
                                <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                                <small id="fileHelp" className="demands-text text-muted">Yêu cầu đính kèm theo ảnh minh chứng</small>

                                <Button variant="success" block type="submit" onClick={handleRegister}>
                                    Gửi demands
                                    </Button>
                            </div>
                        </div>
                    </div>
                )}
                {message && (
                    <div className="form-group">
                        <div className="container p-3 my-3 border border-dark">
                            <div
                                className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                <div className="card card-container" >
                                    <h1>{message}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    )
}


