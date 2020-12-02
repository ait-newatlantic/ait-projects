import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import AuthService from "../../services/auth.service";
import "./style.css"
import blue from "../../static/imgs/blue.jpg"

export default function Sidebar(props) {
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

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <a className="navbar-brand" href="/home">AIT</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">Trang chủ <span className="sr-only">(current)</span></a>
                    </li>
                    {showAdminBoard && (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Báo cáo & phân tích KD</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Nhập liệu</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/kinhdoanh/nhaplieu/demands">Nhu cầu thực tế</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo KD</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/kinhdoanh/baocao/tongquatkd">Báo cáo TQ</a>
                                            <a className="dropdown-item" href="/kinhdoanh/baocao/chitietkd">Báo cáo CT</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Biểu đồ KD</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/kinhdoanh/bieudokd/bieudotq">Biểu đồ TQ</a>
                                            <a className="dropdown-item" href="/kinhdoanh/bieudokd/bieudoct">Biểu đồ CT</a>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Khách hàng</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Khởi tạo</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/customers/khoitao">Khởi tạo KH</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo KD</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="/customers/danhsach">Danh sách KH</a>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Quản lý nhân sự</a>
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Quản lý CV chi nhánh</a>
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phân tích dòng xe</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Nhập liệu</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Đầu kéo</a>
                                            <a className="dropdown-item" href="#">Ben 3 chân</a>
                                            <a className="dropdown-item" href="#">Ben 4 chân</a>
                                            <a className="dropdown-item" href="#">Xe tải thùng</a>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" data-toggle="dropdown">Báo cáo</a>
                                        <ul className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Đầu kéo</a>
                                            <a className="dropdown-item" href="#">Ben 3 chân</a>
                                            <a className="dropdown-item" href="#">Ben 4 chân</a>
                                            <a className="dropdown-item" href="#">Xe tải thùng</a>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}
                </ul>
            </div>
        </nav>
    )
};
