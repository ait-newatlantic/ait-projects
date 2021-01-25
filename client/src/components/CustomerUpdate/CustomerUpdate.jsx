import React, { useState, useContext, useRef, useEffect } from 'react'
import { Alert, Button } from "react-bootstrap";
import { ProvinceContext } from '../../context/province/ProvinceContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomerService from "../../services/customer.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../services/auth.service";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SendIcon from '@material-ui/icons/Send';
import UserService from "../../services/user.service";


export default function CustomerUpdate(props) {
    const [customer_representative, setCustomer_Representative] = useState(null);
    const [customer_representative_number, setCustomer_Representative_Number] = useState(null);
    const [customer_representative_email, setCustomer_Representative_Email] = useState(null);
    const [id, setId] = useState("");
    const [customers, setCustomers] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    const form = useRef();
    const checkBtn = useRef();

    const currentUser = AuthService.getCurrentUser();

    const onChangeCustomer_Representative_Number = (e) => {
        const customer_representative_number = e.target.value;
        setCustomer_Representative_Number(customer_representative_number);
    };

    const onChangeCustomer_Representative_Email = (e) => {
        const customer_representative_email = e.target.value;
        setCustomer_Representative_Email(customer_representative_email);
    };

    const onChangeCustomer_Representative = (e) => {
        const customer_representative = e.target.value;
        setCustomer_Representative(customer_representative);
    };

    const validEmail = (value) => {
        if (!value.trim().length) {
            setCustomer_Representative_Email(customers.customer_representative_email)
        }
    };

    const validName = (value) => {
        if (!value.trim().length) {
            setCustomer_Representative(customers.customer_representative)
        }
    };

    const validNumber = (value) => {
        if (!value.trim().length) {
            setCustomer_Representative_Number(customers.customer_representative_number)
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setId(props.match.params.id)
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            CustomerService.update_specific_customer(
                id,
                customer_representative,
                customer_representative_email,
                customer_representative_number
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
        CustomerService.get_specific_customer(id)
            .then(response => {
                setCustomers(response.data);
                setId(props.match.params.id);
                setCustomer_Representative(response.data.customer_representative);
                setCustomer_Representative_Email(response.data.customer_representative_email);
                setCustomer_Representative_Number(response.data.customer_representative_number);
                console.log(response.data)
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
                <Form onSubmit={handleUpdate} ref={form}>
                    {!successful && (
                        <div>
                            <div className="card-deck">
                                <div className="card">
                                    <div className="card-body">
                                        <h6><strong>Thông tin khách hàng</strong></h6>
                                        <div className="row">
                                            <label className="col-lg-4" >Tên KH (1) (*): </label>
                                            <div className="col-sm">
                                                <div className="form-control" style={{overflow: "auto"}}>
                                                    {customers.customer}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-lg-4" >SĐT KH (*): </label>
                                            <div className="col-sm">
                                                <div className="form-control">
                                                    {customers.customer_number}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-lg-4">Khu vực KH (*): </label>
                                            <div className="col-sm">
                                                <div className="form-control">
                                                    {customers.customer_area}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className="col-lg-4" >Hình thức KH (*): </label>
                                            <div className="col-sm">
                                                <div className="form-control">
                                                    {customers.customer_type}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className="col-lg-4">Địa chỉ KH (*): </label>
                                            <div className="col-sm">
                                                <textarea type="customer_address" className="form-control" id="exampleFormControlTextarea1" rows="3" value={customers.customer_address}></textarea>
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
                                                    placeholder={customer_representative}
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
                                                    placeholder={customer_representative_number}
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
                                                    placeholder={customer_representative_email}
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
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="card">
                                <div className="text-center">
                                    <Button variant="success" type="submit" onClick={handleUpdate}>
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
                :
                <div>{content}</div>
            }
        </div>
    )
}