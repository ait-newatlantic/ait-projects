
import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./sidebar.css"
import Home from '../Home/Home';
import { Route } from 'react-router-dom';
import About from '../About/About';

export default function Sidebar() {
    return (
        <nav className="text-white" style={{ backgroundColor: " #24305E" }} id="sidebar">
            <div className="p-4 pt-5">
                <ul className="list-unstyled components mb-5">
                    <li className="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Kinh doanh</a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <a href="/demands/input">Nhập liệu</a>
                            </li>
                            <li>
                                <a href="/admin/demands/overallreport">Báo cáo</a>
                            </li>
                        </ul>
                    </li>
                    <li >
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Khách hàng</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <a href="/customers/input">Nhập liệu</a>
                            </li>
                            <li>
                                <a href="/admin/customers/list">Danh sách</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#editSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Cài đặt</a>
                        <ul className="collapse list-unstyled" id="editSubmenu">
                            <li>
                                <a href="/resetpassword">Đổi mật khẩu</a>
                            </li>
                            <li>
                                <a href="/userlist">Danh sách users</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}