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
        <nav className="navbar navbar-expand navbar-dark navbar-custom">
            <a class="navbar-brand" href="/home">AIT</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a class="nav-link" href="/home">Trang chủ <span class="sr-only">(current)</span></a>
                    </li>

                    {showModeratorBoard && (
                        <ul class="navbar-nav">
                        <li className="nav-item  active">
                            <a class="nav-link" href="/mod">Dashboard</a>
                        </li>
                        </ul>
                    )}

                    {showAdminBoard && (
                        <ul class="navbar-nav">
                            <li className="nav-item  active">
                                <a class="nav-link" href="/admin">Dashboard</a>
                            </li>
                            <li className="nav-item  active">
                                <a class="nav-link" href="/register">Đăng kí User</a>
                            </li>  
                            <li className="nav-item  active">
                                <a class="nav-link" href="/register">Cấp quyền User</a>
                            </li>                  
                        </ul>
                    )}

                    {/* {currentUser && (
                        <li className="nav-item">
                            <a class="nav-link" href="/user">Nhân Viên</a>
                        </li>
                    )} */}
                </ul>
            </div>

            {currentUser ? (
                <ul className="navbar-nav">
                    <li className="nav-item  active">
                        <a class="nav-link" href="/profile">{currentUser.username}</a>
                    </li>
                    <li className="nav-item  active">
                        <a href="/login" className="nav-link" onClick={logOut}>
                            Đăng xuất
                        </a>
                    </li>
                </ul>
            ) : (
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                    </ul>
                )}
        </nav>
    )
}