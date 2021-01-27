import React, { useState, useContext, useEffect, useRef, useCallback } from 'react'

import { ModelContext } from '../../context/model/ModelContext'
import { TypeContext } from '../../context/type/TypeContext'

import DemandService from "../../services/demand.service";
import CustomerService from "../../services/customer.service";
import AuthService from "../../services/auth.service";

import CheckButton from "react-validation/build/button";
import { Alert, Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import SendIcon from '@material-ui/icons/Send';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import UserService from "../../services/user.service";
import "./style.css"
import 'react-pro-sidebar/dist/css/styles.css';

export default function DemandInput(props) {
    const [date, setDate] = useState("");
    const [employee, setEmployee] = useState("");
    const [employee_field, setEmployee_Field] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(null);
    const [status, setStatus] = useState("");
    const [customer, setCustomer] = useState("");
    const [customer_number, setCustomer_Number] = useState(null);
    const [customer_type, setCustomer_Type] = useState("");
    const [customer_area, setCustomer_Area] = useState("");
    const [customer_opinion, setCustomer_Opinion] = useState(null);
    const [customer_meeting, setCustomer_Meeting] = useState(null);
    const [customer_communication, setCustomer_Communication] = useState("");
    const [color, setColor] = useState("");
    const [note, setNote] = useState(null);
    const [message, setMessage] = useState("");
    const [models, setModels] = useContext(ModelContext);
    const [types, setTypes] = useContext(TypeContext);
    const [customers, setCustomers] = useState([]);
    const [customerResult, setCustomerResult] = useState();
    const currentUser = AuthService.getCurrentUser();
    const [successful, setSuccessful] = useState(false);
    const [arr, setArr] = useState([])
    const [content, setContent] = useState("");
    const form = useRef();
    const checkBtn = useRef();

    const addToList = () => {
        if (!model || !type || !color || !quantity) {
            alert("Xin hãy nhập đủ thông tin xe!!!")
        }
        else {
            arr.push({ model, type, color, quantity })
            setArr((prevArr) => ([...prevArr]));
            // console.log(arr)
        }
    }

    const removeFromList = () => {
        arr.pop()
        setArr((prevArr) => ([...prevArr]));
        // console.log(arr)
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
            // console.log(response.data)
        });
    }, [customer])

    useEffect(() => {
        setEmployee(currentUser.username)
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
        if (currentUser.username.split('.')[0] === "AIT") {
            CustomerService.get_customers("").then((response) => {
                setCustomers(response.data)
            })
        }
        else {
            CustomerService.get_customers(currentUser.username.split('.')[0]).then((response) => {
                setCustomers(response.data)
            })
        }
        Autofill();
    }, [customer, Autofill]);


    return (
        <div className="custom">
            { content === "Nhân viên" ?
                <div>
                     <div className="card-header text-white" style={{ backgroundColor: "#24305E" }}>
                        NHẬP NHU CẦU THỰC TẾ
                    </div>
                    <Form onSubmit={handleRegister} ref={form}>
                        {!successful && (
                            <div>
                                <div className="card-deck">
                                    <div className="card">
                                        <div className="form-group">
                                            <div className="card-body">
                                                <h6><strong>Thông tin khách hàng </strong></h6>
                                                <div className="row p-2">
                                                    <label className="col-lg-4">Tên khách hàng (*)</label>
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
                                                {customer.length > 0 ?
                                                    <div>
                                                        <div className="row p-2">
                                                            <label className="col-lg-4" >SĐT khách hàng (*)</label>
                                                            <div className="col-sm">
                                                                <p className="form-control">{customer_number}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row p-2">
                                                            <label className="col-lg-4">Khu vực (*)</label>
                                                            <div className="col-sm">
                                                                <p className="form-control">{customer_area}</p>
                                                            </div>
                                                        </div>
                                                    </div> : <div></div>
                                                }

                                                <div className="row p-2">
                                                    <label className="col-lg-4" >Giai đoạn (*)</label>
                                                    <div className="col-sm">
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

                                                <div className="row p-2">
                                                    <label className="col-lg-4" >Loại khách hàng (*) </label>
                                                    <div className="col-sm">
                                                        <Select className="form-control" id="exampleFormControlSelect1"
                                                            validations={[required]}
                                                            onChange={onChangeCustomer_Type}>
                                                            <option value="">Click để chọn</option>
                                                            <option value="DỰ KIẾN">DỰ KIẾN</option>
                                                            <option value="TIỀM NĂNG">TIỀM NĂNG</option>
                                                            <option value="ĐÃ SỬ DỤNG KAMAZ">ĐÃ SỬ DỤNG KAMAZ</option>
                                                        </Select>
                                                    </div>
                                                </div>
                                                {customer_type === "ĐÃ SỬ DỤNG KAMAZ" ?
                                                    <div className="row p-2">
                                                        <label className="col-lg-4">Ý kiến khách hàng</label>
                                                        <div className="col-sm">
                                                            <textarea type="customer_opinion"
                                                                className="form-control"
                                                                id="exampleFormControlTextarea1"
                                                                rows="3"
                                                                onChange={onChangeCustomer_Opinion}></textarea>
                                                        </div>
                                                    </div>
                                                    : <div></div>
                                                }

                                                <div className="row p-2">
                                                    <label className="col-lg-4" >Phương thức liên lạc (*)</label>
                                                    <div className="col-sm">
                                                        <Select className="form-control" id="exampleFormControlSelect1"
                                                            validations={[required]}
                                                            onChange={onChangeCustomer_Communication}>
                                                            <option value="">Click để chọn</option>
                                                            <option value="GẶP TRỰC TIẾP">GẶP TRỰC TIẾP</option>
                                                            <option value="QUA ĐIỆN THOẠI">QUA ĐIỆN THOẠI</option>
                                                            <option value="QUA EMAIL/CHAT(ZALO,...)">QUA EMAIL/CHAT(ZALO,...)</option>
                                                        </Select>
                                                    </div>
                                                </div>

                                                {customer_communication === "GẶP TRỰC TIẾP" ?
                                                    <div className="row p-2">
                                                        <label className="col-lg-4">Địa điểm giao dịch</label>
                                                        <div className="col-sm">
                                                            <textarea type="customer_meeting" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setCustomer_Meeting(e.target.value)}></textarea>
                                                        </div>
                                                    </div> : <div></div>}

                                                <div className="row p-2">
                                                    <label className="col-lg-4">Ghi chú</label>
                                                    <div className="col-sm">
                                                        <textarea type="note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={onChangeNote}></textarea>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="form-group">
                                            <div className="card-body" >
                                                <h6><strong>Thông tin người nhập & ngày tháng</strong></h6>
                                                <div className="row p-2">
                                                    <label className="col-lg-4" >Người nhập</label>
                                                    <div className="col-sm">
                                                        <input type="employee" value={currentUser.username} className="form-control" id="exampleFormControlInput1" />
                                                    </div>
                                                </div>

                                                <div className="row p-2">
                                                    <label className="col-lg-4" >Người gặp khách hàng (*)</label>
                                                    <div className="col-sm">
                                                        <Input
                                                            type="employee_field"
                                                            className="form-control"
                                                            name="demployee_field"
                                                            value={employee_field}
                                                            onChange={onChangeEmployee_Field}
                                                            validations={[required, validEmployee_Field]}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row p-2">
                                                    <label className="col-lg-4">Ngày gặp khách hàng (*)</label>
                                                    <div className="col-sm">
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
                                    </div>
                                </div>
                                <br />
                                <div className="card-deck">
                                    <div className="card">
                                        <div className="form-group">
                                            <div className="card-body" >
                                                <h6><strong>Thông tin xe</strong></h6>
                                                <div className="row p-2">
                                                    <label className="col-lg-4">Model xe (*)</label>
                                                    <div className="col-sm">
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
                                                </div>
                                                <div className="row p-2">
                                                    <label className="col-lg-4">Loại xe (*)</label>
                                                    <div className="col-sm">
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
                                                </div>
                                                <div className="row p-2">
                                                    <label className="col-lg-4">Số lượng (*)</label>
                                                    <div className="col-sm">
                                                        <Input
                                                            type="number"
                                                            className="form-control"
                                                            name="quantity"
                                                            value={quantity}
                                                            onChange={onChangeQuantity}
                                                            validations={[required, validQuanity]}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row p-2">
                                                    <label className="col-lg-4">Màu xe (*)</label>
                                                    <div className="col-sm">
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
                                                <div className="text-center">
                                                    <IconButton onClick={addToList}>
                                                        <AddIcon />
                                                    </IconButton>
                                                    <IconButton onClick={removeFromList}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body" >
                                            <h6><strong>Danh sách xe</strong></h6>
                                            <div className="table-container">
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
                                <br />
                                <div className="text-right">
                                    <Button variant="success" type="submit" onClick={handleRegister}>
                                        GỬI FORM  <SendIcon />
                                    </Button>
                                </div>
                                <br />
                                {/* <div>
                                        <strong>Chú thích:</strong>
                                        <HtmlTooltip
                                            title={
                                                <React.Fragment>
                                                    <Typography color="inherit"><strong>GIẢI THÍCH LOẠI KHÁCH HÀNG</strong></Typography>
                                                    <p></p><b>{'DỰ KIẾN: '}</b>{"chỉ mới tiếp cận và chào hàng"}.{' '}<p />
                                                    <p><b>{'TIỀM NĂNG: '}</b>{"Họ có nhu cầu và dự định sử dụng sản phẩm của mình, sau khi được chào hàng"}.{' '}</p>
                                                    <p><b>{'ĐÃ SỬ DỤNG KAMAZ: '}</b>{"Khách hàng đã và đang sử dụng sản phẩm của mình"}.{' '}</p>
                                                </React.Fragment>
                                            }>
                                            <IconButton aria-label="info">
                                                <InfoIcon />
                                            </IconButton>
                                        </HtmlTooltip>
                                        <p><ArrowRightAltIcon /><strong> (*)</strong> Vui lòng điền (chọn) đầy đủ thông tin.</p>
                                        <p><ArrowRightAltIcon /> Dấu <strong>(+)</strong> để thêm xe vào danh sách và dấu <strong>(-)</strong> để loại bỏ xe cuối cùng trong danh sách</p>
                                    </div> */}
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
                </div >
                :
                <div>{content}</div>
            }
        </div>
    )
}