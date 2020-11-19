import React from "react"
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/home">
                <img src="https://www.newatlantic.vn/images/logos/ait_logo.jpg" alt="logo" width="50" height="50" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Menu menuButton={<MenuButton className="btn btn-dark">Báo cáo & phân tích KD</MenuButton>}>
                            <SubMenu label="Nhập liệu">
                                <MenuItem href="/kinhdoanh/nhaplieu/nhucauthucte">Nhập nhu cầu thực tế</MenuItem>
                            </SubMenu>
                            <SubMenu label="Báo cáo KD">
                                <MenuItem href="/kinhdoanh/baocao/tongquatkd">Báo cáo tổng quát</MenuItem>
                                <MenuItem href="/kinhdoanh/baocao/chitietkd">Báo cáo chi tiết</MenuItem>
                            </SubMenu>
                            <SubMenu label="Biểu đồ KD">
                                <MenuItem href="/kinhdoanh/bieudokd/bieudotq">Biểu đồ tổng quát</MenuItem>
                                <MenuItem href="/kinhdoanh/bieudokd/bieudoct">Biểu đồ chi tiết</MenuItem>
                            </SubMenu>
                        </Menu>
                    </li>
                    <li className="nav-item">
                        <Menu menuButton={<MenuButton className="btn btn-dark">Quản lý nhân sự</MenuButton>}>
                            <SubMenu label="Nhập liệu">
                                <MenuItem>Khởi tạo NV</MenuItem>
                            </SubMenu>
                            <SubMenu label="Báo cáo">
                                <MenuItem>Tổng hợp DSNS</MenuItem>
                                <MenuItem>Hồ sơ NV</MenuItem>
                            </SubMenu>
                        </Menu>
                    </li>
                    <li className="nav-item">
                        <Menu menuButton={<MenuButton className="btn btn-dark">Quản lý CV chi nhánh</MenuButton>}>
                            <SubMenu label="Báo cáo giao dịch với KH">
                                <MenuItem>1</MenuItem>
                                <MenuItem>2</MenuItem>
                                <MenuItem>3 </MenuItem>
                            </SubMenu>
                        </Menu>
                    </li>
                    <li className="nav-item">
                        <Menu menuButton={<MenuButton className="btn btn-dark">Khách hàng</MenuButton>}>
                            <SubMenu label="Cập nhật">
                                <MenuItem>Cập nhật khách hàng</MenuItem>
                            </SubMenu>
                            <SubMenu label="Nhập liệu">
                                <MenuItem>Nhu cầu khách hàng</MenuItem>
                            </SubMenu>
                            <SubMenu label="Báo cáo">
                                <MenuItem>Báo cáo quản lí khách hàng</MenuItem>
                            </SubMenu>
                        </Menu>
                    </li>
                    <li className="nav-item">
                        <Menu menuButton={<MenuButton className="btn btn-dark">Phân tích dòng xe</MenuButton>}>
                            <SubMenu label="Nhập liệu">
                                <MenuItem>Phân khúc đầu kéo</MenuItem>
                                <MenuItem>Phân khúc Ben 3 chân</MenuItem>
                                <MenuItem>Phân khúc Ben 4 chân</MenuItem>
                                <MenuItem>Phân khúc xe tải thùng</MenuItem>
                            </SubMenu>
                            <SubMenu label="Báo cáo phân tích các dòng xe">
                                <MenuItem>Phân khúc đầu kéo</MenuItem>
                                <MenuItem>Phân khúc Ben 3 chân</MenuItem>
                                <MenuItem>Phân khúc Ben 4 chân</MenuItem>
                                <MenuItem>Phân khúc xe tải thùng</MenuItem>
                            </SubMenu>
                        </Menu>
                    </li>
                </ul>
            </div>
        </nav>
    )
}