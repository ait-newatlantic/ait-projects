import React, { useEffect, useState } from "react"
import AuthService from "../../services/auth.service";
import "./style.css"

export default function Nav() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/home">AIT</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">Trang chủ <span className="sr-only">(current)</span></a>
                    </li>
                </ul>

                {showModeratorBoard && (
                    <ul className="navbar-nav">
                        <li className="nav-item  active">
                            <a className="nav-link" href="/mod">Dashboard</a>
                        </li>
                    </ul>
                )}

                {showAdminBoard && (
                    <ul className="navbar-nav">
                        <li className="nav-item  active">
                            <a className="nav-link" href="/admin">Dashboard</a>
                        </li>
                        <li className="nav-item  active">
                            <a className="nav-link" href="/register">Đăng kí User</a>
                        </li>
                        <li className="nav-item  active">
                            <a className="nav-link" href="#">Cấp quyền User</a>
                        </li>
                        <li className="nav-item  active">
                            <a className="nav-link" href="/thongbao">Thông báo</a>
                        </li>
                    </ul>
                )}

                {/* {currentUser && (
                        <li className="nav-item">
                            <a className="nav-link" href="/user">Nhân Viên</a>
                        </li>
                    )} */}

                {currentUser ? (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/profile">{currentUser.username}</a>
                        </li>
                        <li className="nav-item active">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                Đăng xuất
                        </a>
                        </li>
                    </ul>
                ) : (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </ul>
                    )}
            </div>
        </nav>
    )
}