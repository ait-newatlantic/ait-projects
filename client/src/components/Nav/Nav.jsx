import React, { useEffect, useState } from "react"
import AuthService from "../../services/auth.service";
import "./style.css"
import logo from "../../../src/static/imgs/ait_logo.jpg"

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <a className="navbar-brand" href="/home">
                    <img src={logo} alt="logo" height="50vh"/>
                </a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">Trang chủ <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/about">Giới thiệu<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/support">Hỗ trợ<span className="sr-only">(current)</span></a>
                    </li>
                    {showModeratorBoard && (
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Kinh doanh</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Nhập liệu</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="/demands/input">Nhu cầu thực tế</a>
                                    </ul>
                                </li>
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo KD</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="/demands/overallreport">Báo cáo tổng quát</a>
                                        <a className="dropdown-item" href="/demands/detailreport">Báo cáo chi tiết</a>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Khách hàng</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Khởi tạo</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="/customers/input">Khởi tạo khách hàng</a>
                                    </ul>
                                </li>
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo KD</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="/customers/list">Danh sách khách hàng</a>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {/* <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Nhân sự</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Khởi tạo</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Khởi tạo NV</a>
                                    </ul>
                                </li>
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Tổng hợp DSNS</a>
                                        <a className="dropdown-item" href="#">Hồ sơ NV</a>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Chi nhánh</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo giao dịch với KH</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="#">1</a>
                                        <a className="dropdown-item" href="#">2</a>
                                        <a className="dropdown-item" href="#">3</a>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Các dòng xe</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Nhập liệu</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Phân khúc Đầu kéo</a>
                                        <a className="dropdown-item" href="#">Phân khúc Ben 3 chân</a>
                                        <a className="dropdown-item" href="#">Phân khúc Ben 4 chân</a>
                                        <a className="dropdown-item" href="#">Phân khúc Xe tải thùng</a>
                                    </ul>
                                </li>
                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo</a>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Phân khúc Đầu kéo</a>
                                        <a className="dropdown-item" href="#">Phân khúc Ben 3 chân</a>
                                        <a className="dropdown-item" href="#">Phân khúc Ben 4 chân</a>
                                        <a className="dropdown-item" href="#">Phân khúc Xe tải thùng</a>
                                    </ul>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                    )}
                    {showAdminBoard && (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Kinh doanh</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Nhập liệu</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/demands/input">Nhu cầu thực tế</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo KD</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/demands/overallreport">Báo cáo tổng quát</a>
                                            <a className="dropdown-item" href="/demands/detailreport">Báo cáo chi tiết</a>
                                        </ul>
                                    </li> 
                                </ul>
                            </li>
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Khách hàng</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Khởi tạo</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/customers/input">Khởi tạo KH</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo KD</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/customers/list">Danh sách KH</a>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            {/* <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Nhân sự</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Khởi tạo</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Khởi tạo NV</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Tổng hợp DSNS</a>
                                            <a className="dropdown-item" href="#">Hồ sơ NV</a>
                                        </ul>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Chi nhánh</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo giao dịch với KH</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="#">1</a>
                                            <a className="dropdown-item" href="#">2</a>
                                            <a className="dropdown-item" href="#">3</a>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Các dòng xe</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Nhập liệu</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Phân khúc Đầu kéo</a>
                                            <a className="dropdown-item" href="#">Phân khúc Ben 3 chân</a>
                                            <a className="dropdown-item" href="#">Phân khúc Ben 4 chân</a>
                                            <a className="dropdown-item" href="#">Phân khúc Xe tải thùng</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Phân khúc Đầu kéo</a>
                                            <a className="dropdown-item" href="#">Phân khúc Ben 3 chân</a>
                                            <a className="dropdown-item" href="#">Phân khúc Ben 4 chân</a>
                                            <a className="dropdown-item" href="#">Phân khúc Xe tải thùng</a>
                                        </ul>
                                    </li>
                                </ul>
                            </li>*/}
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Cài đặt
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/register">Đăng kí User</a>
                                    <a className="dropdown-item" href="#">Cấp quyền User</a>
                                </div>
                            </li> 
                        </ul>
                    )}
                </ul>
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