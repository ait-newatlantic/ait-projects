import React, { useState, useContext, useEffect, useRef } from 'react'
import { Alert, Button } from "react-bootstrap";
import { ProvinceContext } from '../../context/province/ProvinceContext'
import 'react-pro-sidebar/dist/css/styles.css';
import logo from "../../static/imgs/ait_logo.jpg"
import CustomerService from "../../../src/services/customer.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export default function CNKH(props) {
    const [customer_representative, setCustomer_Representative] = useState(null);
    const [customer_representative_number, setCustomer_Representative_Number] = useState(null);
    const [customer_representative_email, setCustomer_Representative_Email] = useState(null);
    const [id, setId] = useState("");

    const [provinces, setProvinces] = useContext(ProvinceContext);

    const [customers, setCustomers] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();

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

    const validString = (value) => {
        if (!value.trim().length) {
            return (
                <div className="alert alert-danger" role="alert">
                    The input type should not be empty.
                </div>
            );
        }
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


    return (
        <div className="container-fluid p-3 my-3 border border-dark custom">
            <Form onSubmit={handleUpdate} ref={form}>
                {!successful && (
                    <div>
                        <div className="head">
                            <img src={logo} alt="logo" width="100" height="100" />
                            <h1>FORM CẬP NHẬT KHÁCH HÀNG</h1>
                        </div>

                        <div className="container-fluid p-3 my-3 border border-dark" >
                            <p><strong>Thông tin khách hàng</strong></p>
                            <div className="row">
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >Tên khách hàng</label>
                                    <input type="customer" defaultValue={customers.customer} className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >SĐT khách hàng</label>
                                    <input type="customer_number" defaultValue={customers.customer_number} className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlSelect1">Khu vực khách hàng</label>
                                    <input
                                        type="customer_number"
                                        defaultValue={customers.customer_area} className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >Mã số thuế</label>
                                    <input type="customer_taxcode" defaultValue={customers.customer_taxcode} className="form-control" id="exampleFormControlInput1" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >Tên người đại diện</label>
                                    <Input
                                        style={{ background: "#add8e6" }}
                                        type="text"
                                        className="form-control"
                                        name="customer_representative"
                                        validations={[validName]}
                                        placeholder={customers.customer_representative}
                                        onChange={onChangeCustomer_Representative}
                                    />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >SĐT người đại diện</label>
                                    <Input
                                        style={{ background: "#add8e6" }}
                                        type="text"
                                        className="form-control"
                                        name="customer_representative_number"
                                        validations={[validNumber]}
                                        placeholder={customers.customer_representative_number}
                                        onChange={onChangeCustomer_Representative_Number}
                                    />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >Email người đại diện</label>
                                    <Input
                                        style={{ background: "#add8e6" }}
                                        type="text"
                                        className="form-control"
                                        name="customer_representative"
                                        validations={[validEmail]}
                                        placeholder={customers.customer_representative_email}
                                        onChange={onChangeCustomer_Representative_Email}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlSelect1" >Loại khách hàng</label>
                                    <select className="form-control" id="exampleFormControlSelect1">
                                        <option defaultValue="" >{customers.customer_type}</option>
                                    </select>
                                </div>
                                <div className="col-sm-9">
                                    <label htmlFor="exampleFormControlTextarea1">Địa chỉ khách hàng</label>
                                    <textarea
                                        type="customer_address"
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        defaultValue={customers.customer_address}
                                        rows="3">
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid p-3 my-3 border border-dark" >
                            <Button variant="success" block type="submit" onClick={handleUpdate}>
                                Cập nhật
                    </Button>
                        </div>
                    </div>
                )}
                {message && (
                    <div className="form-group">
                        <div className="container-fluid p-3 my-3 border border-dark">
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