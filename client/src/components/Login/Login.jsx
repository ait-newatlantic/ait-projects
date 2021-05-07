import React, { useState, useRef } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import * as MaterialUIIcons from '@material-ui/icons/'
import AuthService from "../../services/auth.service"

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        setMessage("")
        setLoading(true)

        form.current.validateAll()

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    props.history.push("/home")
                    window.location.reload()
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()

                    setLoading(false)
                    setMessage(resMessage)
                }
            )
        } else {
            setLoading(false)
        }
    }

    return (
        <div className="flex d-flex justify-content-center">
            <div className="card p-4 bg-light">
                <Form onSubmit={handleLogin} ref={form}>
                    <h3 className="lead font-weight-bold text-dark">Công ty cổ phần TMQT Tân Đại Tây Dương</h3>
                    <p className="font-weight-bold text-dark">AIT SOFTWARE</p>
                    <div className="form-group">
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-warning btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    <div className="form-group">
                        <div className="flex d-flex justify-content-around">
                            <div>
                                <MaterialUIIcons.Facebook/>
                            </div>
                            <div>
                                <MaterialUIIcons.YouTube/>
                            </div>
                            <div>
                                <MaterialUIIcons.GitHub/>
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default Login