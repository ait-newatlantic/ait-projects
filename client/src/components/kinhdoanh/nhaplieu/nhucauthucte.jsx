import React, { useState, useContext, useEffect, useRef } from 'react'
import { ProvinceContext } from '../../../context/province/ProvinceContext'
import { ModelContext } from '../../../context/model/ModelContext'
import { TypeContext } from '../../../context/type/TypeContext'
import { CustomerContext } from '../../../context/customer/CustomerContext'
import { Alert, Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'react-pro-sidebar/dist/css/styles.css';
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";
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

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const currentUsers = AuthService.getCurrentUser();
    const [content, setContent] = useState("");

    const [successful, setSuccessful] = useState(false);

    const form = useRef();
    const checkBtn = useRef();

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
        UserService.getAdminBoard().then(
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
        setEmployee(currentUsers.username)
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);


    useEffect(() => {
        Autofill();
    }, [customer, Autofill])

    return (
        <div className="container p-3 my-3 border border-dark">
            <div>
                <img
                    src={logo}
                    alt="logo-img"
                    className="profile-img-card"
                />
                <h1>FORM NHẬP NHU CẦU THỰC TẾ</h1>
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <div className="container p-3 my-3 border border-dark" >
                                    <p><strong>Thông tin khách hàng</strong></p>
                                    <div className="row">

                                    </div>
                                    <div className="row">
                                        <div className="col-sm">
                                            <label htmlFor="exampleFormControlSelect1">Tên khách hàng</label>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        size="small"
                                                        value={customer}
                                                        onChange={(event, newValue) => {
                                                            setCustomer(newValue);
                                                        }}
                                                        inputValue={customer}
                                                        onInputChange={(event, newValue) => {
                                                            setCustomer(newValue);
                                                        }}
                                                        options={customers.map((option) => option.customer)}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <label htmlFor="exampleFormControlInput1" >SĐT khách hàng</label>
                                            <Autocomplete
                                                size="small"
                                                freeSolo
                                                disableClearable
                                                value={customer_number}
                                                onChange={(event, newValue) => {
                                                    setCustomer_Number(newValue);
                                                }}
                                                inputValue={customer_number}
                                                onInputChange={(event, newValue) => {
                                                    setCustomer_Number(newValue);
                                                }}
                                                options={customers.map((option) => option.customer_number)}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                            />
                                        </div>

                                        <div className="col-sm">
                                            <label htmlFor="exampleFormControlSelect1">Khu vực khách hàng</label>
                                            <Autocomplete
                                                size="small"
                                                value={customer_area}
                                                onChange={(event, newValue) => {
                                                    setCustomer_Area(newValue);
                                                }}
                                                options={provinces.map((option) => option.province_name)}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                            />
                                        </div>
                                        <div className="col-sm">
                                            <label htmlFor="exampleFormControlSelect1" >Giai đoạn</label>
                                            <Select className="form-control" id="exampleFormControlSelect1" validations={[required]} onClick={onChangeStatus}>
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
                                            <label htmlFor="exampleFormControlSelect1" >Loại khách hàng</label>
                                            <Select className="form-control" id="exampleFormControlSelect1"
                                                validations={[required]}
                                                onClick={onChangeCustomer_Type}>
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
                                            <label htmlFor="exampleFormControlSelect1" >Phương thức liên lạc</label>
                                            <Select className="form-control" id="exampleFormControlSelect1"
                                                validations={[required]}
                                                onClick={onChangeCustomer_Communication}>
                                                <option value="">Click để chọn</option>
                                                <option value="GẶP TRỰC TIẾP">GẶP TRỰC TIẾP</option>
                                                <option value="QUA ĐIỆN THOẠI">QUA ĐIỆN THOẠI</option>
                                                <option value="QUA EMAIL/CHAT(ZALO,...)">QUA EMAIL/CHAT(ZALO,...)</option>
                                            </Select>
                                        </div>
                                        <div className="col-sm-9" id="diadiem-giaodich">
                                            <label htmlFor="exampleFormControlTextarea1">Địa điểm giao dịch (Đối với trường hợp gặp trực tiếp)</label>
                                            <textarea type="customer_meeting" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setCustomer_Meeting(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="container p-3 my-3 border border-dark" >
                                    <p><strong>Thông tin xe</strong></p>
                                    <div className="row">
                                        <div className="col-sm">
                                            <label htmlFor="exampleFormControlSelect1">Model xe</label>
                                            <Autocomplete
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
                                            <label htmlFor="exampleFormControlSelect1">Loại xe</label>
                                            <Autocomplete
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
                                            <label htmlFor="username">Số lượng</label>
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
                                            <label htmlFor="exampleFormControlSelect1">Màu yêu cầu</label>
                                            <Select className="form-control" id="exampleFormControlSelect1" validations={[required]} onClick={onChangeColor}>
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
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="container p-3 my-3 border border-dark" >
                                    <p><strong>Thông tin nhân viên & ngày tháng</strong></p>
                                    <div className="row">
                                        <div className="col-sm">
                                            <label htmlFor="exampleFormControlInput1" >Người nhập</label>
                                            <input type="employee" defaultValue={currentUsers.username} className="form-control" id="exampleFormControlInput1" />
                                        </div>
                                        <div className="col-sm">
                                            <label htmlFor="exampleFormControlInput1" >Người đi thực tế</label>
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
                                            <label htmlFor="example-date-input" >Ngày đi thực tế</label>
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
                                <div className="container p-3 my-3 border border-dark" >
                                    <label htmlFor="exampleFormControlTextarea1"><strong>Ghi chú</strong></label>
                                    <textarea type="note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={onChangeNote}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="container p-3 my-3 border border-dark" >
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
                            <div className="container p-3 my-3 border border-dark">
                                <div
                                    className={successful ? "alert alert-success" : "alert alert-danger"}
                                    role="alert"
                                >
                                    {/* <div className="card card-container" >
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
        </div>
    )
}