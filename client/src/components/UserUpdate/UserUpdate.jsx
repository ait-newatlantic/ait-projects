import React, { useState, useContext, useEffect, useRef } from 'react'
import { Alert, Button } from "react-bootstrap";
import logo from "../../static/imgs/ait_logo.jpg"
import UserService from "../../services/user.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

export default function UserUpdate(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState("");

    const [users, setUsers] = useState({});
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
            UserService.update_specific_user(
                id,
                password,
                email,
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
                setUsers(response.data);
                setId(props.match.params.id);
                setUsername(response.data.username);
                setPassword(response.data.password);
                setEmail(response.data.email);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
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
                                    <input type="customer" defaultValue={users.username} className="form-control" id="exampleFormControlInput1" />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlInput1" >Password</label>
                                    <input type="customer_number" className="form-control" id="exampleFormControlInput1" onChange={onChangePassword}/>
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlSelect1">Email</label>
                                    <input type="customer_number" defaultValue={users.email} className="form-control" id="exampleFormControlInput1"  onChange={onChangeEmail}/>
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