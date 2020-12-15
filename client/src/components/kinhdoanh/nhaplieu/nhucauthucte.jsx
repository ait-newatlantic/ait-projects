import React, { useState, useContext, useEffect, useRef } from 'react'
import { ProvinceContext } from '../../../context/province/ProvinceContext'
import { ModelContext } from '../../../context/model/ModelContext'
import { TypeContext } from '../../../context/type/TypeContext'
import { CustomerContext } from '../../../context/customer/CustomerContext'
import { Alert, Button, ButtonToolbar, Table } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'react-pro-sidebar/dist/css/styles.css';
import AuthService from "../../../services/auth.service";
import "./style.css"
import { useCallback } from 'react';
import logo from "../../../static/imgs/ait_logo.jpg"
import DemandService from "../../../services/demand.service";
import CustomerService from "../../../services/customer.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function NCTT(props) {
    const [date, setDate] = useState("");
    const [employee, setEmployee] = useState("");
    const [employee_field, setEmployee_Field] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(null);
    const [status, setStatus] = useState("");
    const [customer, setCustomer] = useState("");
    const [customer_number, setCustomer_Number] = useState("");
    const [customer_type, setCustomer_Type] = useState("");
    const [customer_area, setCustomer_Area] = useState("");
    const [customer_opinion, setCustomer_Opinion] = useState(null);
    const [customer_meeting, setCustomer_Meeting] = useState(null);
    const [customer_communication, setCustomer_Communication] = useState("");
    const [color, setColor] = useState("");
    const [note, setNote] = useState(null);
    const [message, setMessage] = useState("");
    const [models, setModels] = useContext(ModelContext);
    const [provinces, setProvinces] = useContext(ProvinceContext);
    const [types, setTypes] = useContext(TypeContext);
    const [customers, setCustomers] = useContext(CustomerContext);
    const [customerResult, setCustomerResult] = useState();
    const currentUser = AuthService.getCurrentUser();
    const [successful, setSuccessful] = useState(false);
    const [arr, setArr] = useState([])
    const form = useRef();
    const checkBtn = useRef();

    const addToList = () => {
        if (!model || !type || !color || !quantity) {
            alert("Xin hãy nhập đủ thông tin xe!!!")
        }
        else {
            arr.push({ model, type, color, quantity })
            setArr((prevArr) => ([...prevArr]));
            console.log(arr)
        }
    }

    const removeFromList = () => {
        arr.pop()
        setArr((prevArr) => ([...prevArr]));
        console.log(arr)
    }

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    const onChangeQuantity = (e) => {
        const quantity = e.target.value;
        setQuantity(quantity);
    };

    const onChangeCustomer_Number = (e) => {
        const customer_number = e.target.value;
        setCustomer_Number(customer_number);
    };

    const onChangeCustomer_Area = (e) => {
        const customer_area = e.target.value;
        setCustomer_Area(customer_area);
    };

    const onChangeDate = (e) => {
        const date = e.target.value;
        setDate(date);
    };

    const onChangeColor = (e) => {
        const color = e.target.value;
        setColor(color);
    };

    const onChangeNote = (e) => {
        const note = e.target.value;
        setNote(note);
    };

    const onChangeStatus = (e) => {
        const status = e.target.value;
        setStatus(status);
    };

    const onChangeCustomer_Type = (e) => {
        const customer_type = e.target.value;
        setCustomer_Type(customer_type);
    };

    const onChangeCustomer_Opinion = (e) => {
        const customer_opinion = e.target.value;
        setCustomer_Opinion(customer_opinion);
    };

    const onChangeCustomer_Communication = (e) => {
        const customer_communication = e.target.value;
        setCustomer_Communication(customer_communication);
    };

    const onChangeEmployee_Field = (e) => {
        const employee_field = e.target.value;
        setEmployee_Field(employee_field);
    };

    const validQuanity = (value) => {
        if (isNaN(value) || !value.trim().length || value < 0) {
            return (
                <div className="alert alert-danger" role="alert">
                    The input type should not be empty, a string or a negative number.
                </div>
            );
        }
    };

    const validEmployee_Field = (value) => {
        if (!value.trim().length) {
            return (
                <div className="alert alert-danger" role="alert">
                    The input type should not be an empty string.
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
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            DemandService.create_demand(
                date,
                employee,
                employee_field,
                model,
                type,
                parseInt(quantity),
                status,
                customer,
                customer_number,
                customer_type,
                customer_area,
                customer_opinion,
                customer_meeting,
                customer_communication,
                color,
                arr,
                note).then(
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
        CustomerService.get_specific_customer_info(
            customer
        ).then((response) => {
            setCustomerResult(response.data);
            response.data.forEach(value => {
                setCustomer_Number(value.customer_number);
                setCustomer_Area(value.customer_area);
            })
            console.log(response.data)
        });
    }, [customer])

    useEffect(() => {
        const employee = currentUser.username
        setEmployee(employee)
        console.log(employee)
    }, []);

    useEffect(() => {
        Autofill();
    }, [customer, Autofill])

    return (
        <div className="custom">
            <div className="head">
                <img src={logo} alt="logo" width="100" height="100" />
                <h1>FORM NHẬP NHU CẦU THỰC TẾ</h1>
            </div>
            <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                        <div className="row">
                            <div className="col-sm">
                                <div className="form-group">
                                    <div className="card card-body">
                                        <p><strong>Thông tin khách hàng</strong></p>
                                        <div className="row">
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1">Tên khách hàng (*)</label>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <Autocomplete
                                                            style={{ background: "white" }}
                                                            size="small"
                                                            disableClearable
                                                            value={customer}
                                                            onChange={(event, newValue) => {
                                                                setCustomer(newValue);
                                                            }}
                                                            options={customers.map((option) => option.customer)}
                                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlInput1" >SĐT khách hàng (*)</label>
                                                <Input
                                                    type="customer_number"
                                                    className="form-control"
                                                    name="customer_number"
                                                    value={customer_number}
                                                    //onChange={onChangeCustomer_Number}
                                                    validations={[required]}
                                                />
                                            </div>

                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1">Chọn khu vực khách hàng (*)</label>
                                                <Input
                                                    type="customer_area"
                                                    className="form-control"
                                                    name="customer_area"
                                                    value={customer_area}
                                                    //onChange={onChangeCustomer_Number}
                                                    validations={[required]}
                                                />
                                            </div>
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1" >Chọn giai đoạn (*)</label>
                                                <Select className="form-control" id="exampleFormControlSelect1" validations={[required]} onChange={onChangeStatus}>
                                                    <option value="" >Click để chọn</option>
                                                    <option value="TIẾP CẬN CHÀO HÀNG">TIẾP CẬN CHÀO HÀNG</option>
                                                    <option value="CHẠY THỬ">CHẠY THỬ</option>
                                                    <option value="ĐÀM PHÁN">ĐÀM PHÁN</option>
                                                    <option value="CHỐT ĐƠN HÀNG">CHỐT ĐƠN HÀNG</option>
                                                    <option value="ĐÃ CỌC">ĐÃ CỌC</option>
                                                    <option value="LÊN HỢP ĐỒNG">LÊN HỢP ĐỒNG</option>
                                                    <option value="ĐÃ THANH TOÁN TẠM ỨNG">ĐÃ THANH TOÁN TẠM ỨNG</option>
                                                    <option value="HOÀN TẤT GIAO DỊCH">HOÀN TẤT GIAO DỊCH</option>
                                                    <option value="BÀN GIAO CHƯA THANH TOÁN">BÀN GIAO CHƯA THANH TOÁN</option>
                                                    <option value="GIAO DỊCH THẤT BẠI">GIAO DỊCH THẤT BẠI</option>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1" >Chọn loại khách hàng (*)</label>
                                                <Select className="form-control" id="exampleFormControlSelect1"
                                                    validations={[required]}
                                                    onChange={onChangeCustomer_Type}>
                                                    <option value="">Click để chọn</option>
                                                    <option value="DỰ KIẾN">DỰ KIẾN</option>
                                                    <option value="TIỀM NĂNG">TIỀM NĂNG</option>
                                                    <option value="ĐÃ SỬ DỤNG KAMAZ">ĐÃ SỬ DỤNG KAMAZ</option>
                                                </Select>
                                                <HtmlTooltip
                                                    title={
                                                        <React.Fragment>
                                                            <Typography color="inherit"><strong>GIẢI THÍCH LOẠI KHÁCH HÀNG</strong></Typography>
                                                            <b>{'DỰ KIẾN: '}</b>{"chỉ mới tiếp cận và chào hàng"}.{' '}
                                                            <b>{'TIỀM NĂNG: '}</b>{"Họ có nhu cầu và dự định sử dụng sản phẩm của mình, sau khi được chào hàng"}.{' '}
                                                            <b>{'ĐÃ SỬ DỤNG KAMAZ: '}</b>{"Khách hàng đã và đang sử dụng sản phẩm của mình"}.{' '}
                                                        </React.Fragment>
                                                    }>
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
                                                    rows="3"
                                                    onChange={onChangeCustomer_Opinion}></textarea>
                                                {!!customerResult && customerResult.map(result => (
                                                    <p>{result.customer_opinion}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1" >Chọn phương thức liên lạc (*)</label>
                                                <Select className="form-control" id="exampleFormControlSelect1"
                                                    validations={[required]}
                                                    onChange={onChangeCustomer_Communication}>
                                                    <option value="">Click để chọn</option>
                                                    <option value="GẶP TRỰC TIẾP">GẶP TRỰC TIẾP</option>
                                                    <option value="QUA ĐIỆN THOẠI">QUA ĐIỆN THOẠI</option>
                                                    <option value="QUA EMAIL/CHAT(ZALO,...)">QUA EMAIL/CHAT(ZALO,...)</option>
                                                </Select>
                                            </div>
                                            <div className="col-sm-9" id="diadiem-giaodich">
                                                <label htmlFor="exampleFormControlTextarea1">Địa điểm giao dịch (Đối với trường hợp gặp trực tiếp) (*)</label>
                                                <textarea type="customer_meeting" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setCustomer_Meeting(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="card card-body" >
                                        <p><strong>Thông tin nhân viên & ngày tháng</strong></p>
                                        <div className="row">
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlInput1" >Người nhập</label>
                                                <input type="employee" value={currentUser.username} className="form-control" id="exampleFormControlInput1" />
                                            </div>
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlInput1" >Người đi thực tế (*)</label>
                                                <Input
                                                    type="employee_field"
                                                    className="form-control"
                                                    name="demployee_field"
                                                    value={employee_field}
                                                    onChange={onChangeEmployee_Field}
                                                    validations={[required, validEmployee_Field]}
                                                />
                                            </div>

                                            <div className="col-sm">
                                                <label htmlFor="example-date-input" >Ngày đi thực tế (*)</label>
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
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="card card-body" >
                                        <label htmlFor="exampleFormControlTextarea1"><strong>Ghi chú</strong></label>
                                        <textarea type="note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={onChangeNote}></textarea>
                                        <br></br>
                                        <div>
                                            <p><strong>Chú thích:</strong></p>
                                            <p><strong>(*)</strong> Vui lòng điền (chọn) đầy đủ thông tin.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="form-group">
                                    <div className="card card-body" >
                                        <p><strong>Thông tin xe</strong></p>
                                        <div className="row">
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1">Model xe (*)</label>
                                                <Autocomplete
                                                    style={{ background: "white" }}
                                                    size="small"
                                                    value={model}
                                                    onChange={(event, newValue) => {
                                                        setModel(newValue);
                                                    }}
                                                    options={models.map((option) => option.model_name)}
                                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                />
                                            </div>
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1">Loại xe (*)</label>
                                                <Autocomplete
                                                    style={{ background: "white" }}
                                                    size="small"
                                                    value={type}
                                                    onChange={(event, newValue) => {
                                                        setType(newValue);
                                                    }}
                                                    options={types.map((option) => option.type_name)}
                                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                />
                                            </div>
                                            <div className="col-sm">
                                                <label htmlFor="username">Số lượng (*)</label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    name="quantity"
                                                    value={quantity}
                                                    onChange={onChangeQuantity}
                                                    validations={[required, validQuanity]}
                                                />
                                            </div>
                                            <div className="col-sm">
                                                <label htmlFor="exampleFormControlSelect1">Màu yêu cầu (*)</label>
                                                <Select className="form-control" id="exampleFormControlSelect1" validations={[required]} onChange={onChangeColor}>
                                                    <option value="">Click để chọn</option>
                                                    <option value="Cam">Cam</option>
                                                    <option value="Trắng">Trắng</option>
                                                    <option value="Vàng">Vàng</option>
                                                    <option value="Xanh">Xanh</option>
                                                    <option value="Đỏ">Đỏ</option>
                                                    <option value="Xanh quân đội">Xanh quân đội</option>
                                                    <option value="Chưa quyết định">Chưa quyết định</option>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <IconButton onClick={addToList}>
                                                <AddIcon />
                                            </IconButton>
                                            <IconButton onClick={removeFromList}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <table className="table" >
                                                <tbody>
                                                    <tr id="titles">
                                                        <th>MODEL XE</th>
                                                        <th>LOẠI XE</th>
                                                        <th>SỐ LƯỢNG</th>
                                                        <th>MÀU YÊU CẦU</th>
                                                    </tr>
                                                    {arr.map((result, index) => (
                                                        <tr className="content" key={index}>
                                                            <td>{result.model}</td>
                                                            <td>{result.type}</td>
                                                            <td>{result.quantity}</td>
                                                            <td>{result.color}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="card card-body" >
                                <label htmlFor="exampleInputFile">Upload ảnh</label>
                                <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                                <small id="fileHelp" className="form-text text-muted">Yêu cầu đính kèm theo ảnh minh chứng</small>
                                <Button variant="success" block type="submit" onClick={handleRegister}>
                                    Gửi form
                                    </Button>
                            </div>
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
                                {/* <div className="card card-container-fluid" >
                                        <h1>{message}</h1>
                                    </div> */}
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
    )
}