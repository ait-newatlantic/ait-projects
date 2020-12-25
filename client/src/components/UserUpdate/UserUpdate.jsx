import React, { useState, useContext, useEffect, useRef } from 'react'
import { Alert, Button } from "react-bootstrap";
import 'react-pro-sidebar/dist/css/styles.css';
import logo from "../../static/imgs/ait_logo.jpg"
import UserService from "../../services/user.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export default function UserUpdate(props) {
    const [customer_representative, setCustomer_Representative] = useState(null);
    const [customer_representative_number, setCustomer_Representative_Number] = useState(null);
    const [customer_representative_email, setCustomer_Representative_Email] = useState(null);
    const [id, setId] = useState("");

    const [customers, setCustomers] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();


    const handleUpdate = (e) => {
        e.preventDefault();
        setId(props.match.params.id)
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            UserService.update_specific_customer(
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
        UserService.get_specific_user(id)
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
        <div className="custom">
            <Form onSubmit={handleUpdate} ref={form}>
                {!successful && (
                    <div>
                        <div className="head">
                            <img src={logo} alt="logo" width="100" height="100" />
                            <h1>CẬP NHẬT USER</h1>
                        </div>

                        <div className="card card-body" >
                            <p><strong>Thông tin user</strong></p>
                            <div className="row">
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >Username</label>
                                    <input type="customer" defaultValue={customers.customer} className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >Password</label>
                                    <input type="customer_number" defaultValue={customers.customer_number} className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlSelect1">Email</label>
                                    <input
                                        type="customer_number"
                                        defaultValue={customers.customer_area} className="form-control" id="exampleFormControlInput1" />
                                </div>
                            </div>
                        </div>

                        <div className="card card-body" >
                            <Button variant="success" block type="submit" onClick={handleUpdate}>
                                Cập nhật
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