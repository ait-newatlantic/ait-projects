import React, { useState, useRef, useEffect } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail } from "validator"
import AuthService from "../../services/auth.service"
import { Alert, Button } from "react-bootstrap"
import UserService from "../../services/user.service"

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        )
    }
}

const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        )
    }
}

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        )
    }
}

const UserUpdate = (props) => {
    const form = useRef()
    const checkBtn = useRef()
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [branch_name, setBranchName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")

    const currentUser = AuthService.getCurrentUser()

    const onChangeName = (e) => {
        const name = e.target.value
        setName(name)
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const fetchUser = () => {
        const id = currentUser.id
        UserService.get_specific_user(
            id,
        ).then((response) => {
            setUsername(response.data[0].username)
            setName(response.data[0].name)
            setEmail(response.data[0].email)
            setBranchName(response.data[0].branch_name)
            setPassword(response.data[0].password)
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        setMessage("")
        setSuccessful(false)
        form.current.validateAll()
        const id = currentUser.id
        if (checkBtn.current.context._errors.length === 0) {
            UserService.update_user(
                id,
                name,
                username,
                password
            ).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()

                    setMessage(resMessage)
                    setSuccessful(false)
                }
            )
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="text-left">
            <div>
                <h4 className="font-weight-bold text-secondary">CẬP NHẬT USER</h4>
            </div>
            <Form onSubmit={handleUpdate} ref={form}>
                {!successful && (
                    <div>
                        <div className="row">
                            <div className="col-sm">
                                Họ và tên:
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={onChangeName}
                                    validations={[required, vname]}
                                />
                            </div>

                            <div className="col-sm">
                                Chi nhánh:
                                <div className="form-control" style={{ overflow: "auto", background: "#e7e7e7" }}>
                                    {branch_name}
                                </div>
                            </div>

                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm">
                                Username:
                                <div className="form-control" style={{ overflow: "auto", background: "#e7e7e7" }}>
                                    {currentUser.username}
                                </div>
                            </div>

                            <div className="col-sm">
                                Email:
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="col-sm">
                                Password:
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>
                        </div>
                        <br />
                        <Button className="btn-sm" variant="warning" type="submit" >Cập nhật</Button>
                    </div>
                )}
                {message && (
                    <div className="form-group">
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
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    )
}

export default UserUpdate