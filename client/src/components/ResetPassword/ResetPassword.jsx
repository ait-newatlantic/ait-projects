import React, { useState, useContext, useEffect, useRef } from 'react'
import { Alert, Button } from "react-bootstrap";
import UserService from "../../services/user.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import AuthService from "../../services/auth.service";
import {
    Container,
    FormWrap,
    Icon,
    FormContent,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Text,
} from "../ResetPassword/ResetElements";

export default function ResetPassword(props) {
    const [password, setPassword] = useState(null);
    const [id, setId] = useState("");

    const currentUser = AuthService.getCurrentUser();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();

    const handleUpdate = (e) => {
        e.preventDefault();
        setId(currentUser.id)
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            UserService.update_specific_user(
                id,
                password,
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

    const Init = () => {
        setId(currentUser.id);
        setPassword(currentUser.password);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    useEffect(() => {
        Init()
        return () => {
        }
    }, [])


    return (
        <div className="custom">
            <Form className="bg-black max-w-sm h-auto w-full z-10 grid my-0 mx-auto py-20 px-8 rounded-2xl shadow-lg sm:p-8" onSubmit={handleUpdate} ref={form}>
                {!successful && (
                    <div>
                        <div>
                            <FormH1>Đổi mật khẩu</FormH1>
                            <div>
                                <FormLabel htmlFor="for">Tên đăng nhập</FormLabel>
                                <input type="customer" defaultValue={currentUser.username} className="form-control" id="exampleFormControlInput1" />
                            </div>
                            <div>
                                <FormLabel htmlFor="for">Password</FormLabel>
                                <input type="customer_number" className="form-control" id="exampleFormControlInput1" onChange={onChangePassword} />
                            </div>
                        </div>
                        <br />
                        <div >
                            <Button variant="primary" block type="submit" onClick={handleUpdate}>
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
    )
}