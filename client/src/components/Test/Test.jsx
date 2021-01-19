import React, { useState, useContext, useRef, useEffect } from 'react'
import { Alert, Button } from "react-bootstrap";
import { ProvinceContext } from '../../context/province/ProvinceContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'react-pro-sidebar/dist/css/styles.css';
import CustomerService from "../../services/customer.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../services/auth.service";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SendIcon from '@material-ui/icons/Send';
import UserService from "../../services/user.service";

export default function CustomerInput() {
    const [employee, setEmployee] = useState("");
    const [customer, setCustomer] = useState("");
    const [customer_number, setCustomer_Number] = useState("");
    const [customer_representative, setCustomer_Representative] = useState(null);
    const [customer_representative_number, setCustomer_Representative_Number] = useState(null);
    const [customer_representative_email, setCustomer_Representative_Email] = useState(null);
    const [customer_taxcode, setCustomer_Taxcode] = useState(null);
    const [customer_type, setCustomer_Type] = useState("");
    const [customer_area, setCustomer_Area] = useState("");
    const [customer_address, setCustomer_Address] = useState(null);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    const form = useRef();
    const checkBtn = useRef();

    const [provinces, setProvinces] = useContext(ProvinceContext);
    const [content, setContent] = useState("");

    const onChangeCustomer = (e) => {
        const customer = e.target.value;
        setCustomer(customer);
    };

    const onChangeCustomer_Number = (e) => {
        const customer_number = e.target.value;
        setCustomer_Number(customer_number);
    };

    const onChangeCustomer_Type = (e) => {
        const customer_type = e.target.value;
        setCustomer_Type(customer_type);
        //console.log(customer_type)
    };

    const onChangeCustomer_Address = (e) => {
        const customer_address = e.target.value;
        setCustomer_Address(customer_address);
    };

    const onChangeCustomer_Taxcode = (e) => {
        const customer_taxcode = e.target.value;
        setCustomer_Taxcode(customer_taxcode);
    };

    const onChangeCustomer_Representative = (e) => {
        const customer_representative = e.target.value;
        setCustomer_Representative(customer_representative);
    };

    const onChangeCustomer_Representative_Number = (e) => {
        const customer_representative_number = e.target.value;
        setCustomer_Representative_Number(customer_representative_number);
    };

    const onChangeCustomer_Representative_Email = (e) => {
        const customer_representative_email = e.target.value;
        setCustomer_Representative_Email(customer_representative_email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        const employee = currentUser.username
        if (checkBtn.current.context._errors.length === 0) {
            CustomerService.create_customer(
                employee,
                customer,
                customer_number,
                customer_representative,
                customer_representative_number,
                customer_representative_email,
                customer_area,
                customer_taxcode,
                customer_type,
                customer_address
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

    return (
        <div className="custom">
            { content == "Nhân viên" ?
                <div>
                    <div className="head">
                        <h5>FORM KHỞI TẠO KHÁCH HÀNG</h5>
                    </div>
                    <Form onSubmit={handleSubmit} ref={form}>
                        {!successful && (
                            <div className="card-group">
                                <div className="card">
                                    <div className="card-body">
                                        <h6><strong>Thông tin khách hàng</strong></h6>
                                        <div className="row">
                                            <label className="col-lg-4" >Tên KH (1) (*): </label>
                                            <div className="col-sm">
                                                <Input
                                                    type="customer"
                                                    className="form-control"
                                                    name="customer"
                                                    value={customer}
                                                    onChange={onChangeCustomer}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-lg-4" >SĐT KH (*): </label>
                                            <div className="col-sm">
                                                <Input
                                                    type="customer_number"
                                                    className="form-control"
                                                    name="customer_number"
                                                    value={customer_number}
                                                    onChange={onChangeCustomer_Number} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-lg-4">Khu vực KH (*): </label>
                                            <div className="col-sm">
                                                <Autocomplete
                                                    style={{ background: "white" }}
                                                    size="small"
                                                    value={customer_area}
                                                    onChange={(event, newValue) => {
                                                        setCustomer_Area(newValue);
                                                    }}
                                                    options={provinces.map((option) => option.province_name)}
                                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className="col-lg-4" >Hình thức KH (*): </label>
                                            <div className="col-sm">
                                                <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeCustomer_Type}>
                                                    <option value="" selected disabled hidden >Click để chọn </option>
                                                    <option value="DOANH NGHIỆP">DOANH NGHIỆP</option>
                                                    <option value="TƯ NHÂN">TƯ NHÂN</option>
                                                </select>
                                            </div>
                                        </div>

                                        {customer_type == "DOANH NGHIỆP" ?
                                            <div className="row">
                                                <label className="col-lg-4" >Mã số thuế: </label>
                                                <div className="col-sm">
                                                    <Input
                                                        type="customer_taxcode"
                                                        className="form-control"
                                                        name="customer_taxcode"
                                                        value={customer_taxcode}
                                                        onChange={onChangeCustomer_Taxcode} /></div>
                                            </div>
                                            : <div></div>
                                        }

                                        <div className="row">
                                            <label className="col-lg-4">Địa chỉ KH (*): </label>
                                            <div className="col-sm">
                                                <textarea type="customer_address" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={onChangeCustomer_Address}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <h6><strong>Thông tin người đại diện</strong></h6>
                                        <div className="row">
                                            <label className="col-lg-4" >Tên người đại diện: </label>
                                            <div className="col-sm">
                                                <Input
                                                    type="customer_representative"
                                                    className="form-control"
                                                    name="customer_number"
                                                    value={customer_representative}
                                                    onChange={onChangeCustomer_Representative} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-lg-4" >SĐT người đại diện: </label>
                                            <div className="col-sm">
                                                <Input
                                                    type="customer_representative_number"
                                                    className="form-control"
                                                    name="customer_representative_number"
                                                    value={customer_representative_number}
                                                    onChange={onChangeCustomer_Representative_Number} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-lg-4" >Email người đại diện: </label>
                                            <div className="col-sm">
                                                <Input
                                                    type="customer_representative_email"
                                                    className="form-control"
                                                    name="customer_representative_email"
                                                    value={customer_representative_email}
                                                    onChange={onChangeCustomer_Representative_Email} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <h6><strong>Thông tin người nhập</strong></h6>
                                        <div className="row">
                                            <label className="col-lg-4" >Người nhập</label>
                                            <div className="col-sm">
                                                <p className="form-control">{currentUser.username}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Button variant="success" block type="submit" onClick={handleSubmit}>
                                                Gửi form <SendIcon />
                                            </Button>
                                        </div>
                                        <div>
                                            <strong>Chú thích:</strong>
                                            <p><ArrowRightAltIcon /><strong> (1)</strong> Vui lòng điền đầy đủ họ tên khách hàng.</p>
                                            <p><ArrowRightAltIcon /><strong> (*)</strong> Vui lòng điền (chọn) đầy đủ thông tin.</p>
                                        </div>
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
                :
                <div>{content}</div>
            }
        </div>
    )
}