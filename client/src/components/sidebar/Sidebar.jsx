import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import AuthService from "../../services/auth.service";
import "./style.css"

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
        <ProSidebar image="https://wallpapermemory.com/uploads/760/blue-background-hd-1080p-294130.jpg">
            {showAdminBoard && (
                <Menu>
                    <MenuItem >{props.data}</MenuItem>
                    <SubMenu title="Báo cáo & phân tích KD">
                        <SubMenu title="Nhập liệu">
                            <MenuItem>Nhu cầu thực tế
                            <Link to="/kinhdoanh/nhaplieu/nhucauthucte" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo KD">
                            <MenuItem>Báo cáo tổng quát
                            <Link to="/kinhdoanh/baocao/tongquatkd" />
                            </MenuItem>
                            <MenuItem>Báo cáo chi tiết
                            <Link to="/kinhdoanh/baocao/chitietkd" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Biểu đồ KD">
                            <MenuItem>Biểu đồ tổng quát
                            <Link to="/kinhdoanh/bieudokd/bieudotq" />
                            </MenuItem>
                            <MenuItem>Biểu đồ chi tiết
                            <Link to="/kinhdoanh/bieudokd/bieudoct" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Khách hàng">
                        <SubMenu title="Khởi tạo">
                            <MenuItem
                            >Khởi tạo KH
                            <Link to="/khachhang/khoitao" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo">
                            <MenuItem
                            >Danh sách KH
                            <Link to="/khachhang/danhsach" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Quản lý nhân sự">
                        <SubMenu title="Nhập liệu">
                            <MenuItem
                            >Khởi tạo nhân viên
                            <Link to="#" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo">
                            <MenuItem
                            >Tổng hợp DSNS
                            <Link to="#" />
                            </MenuItem>
                            <MenuItem
                            >Hồ sơ NV
                            <Link to="#" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Quản lý CV chi nhánh">
                        <SubMenu title="Báo cáo giao dịch với KH">
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                            <MenuItem>3 </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Phân tích dòng xe">
                        <SubMenu title="Nhập liệu">
                            <MenuItem>Phân khúc đầu kéo</MenuItem>
                            <MenuItem>Phân khúc Ben 3 chân</MenuItem>
                            <MenuItem>Phân khúc Ben 4 chân</MenuItem>
                            <MenuItem>Phân khúc xe tải thùng</MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo phân tích các dòng xe">
                            <MenuItem>Phân khúc đầu kéo</MenuItem>
                            <MenuItem>Phân khúc Ben 3 chân</MenuItem>
                            <MenuItem>Phân khúc Ben 4 chân</MenuItem>
                            <MenuItem>Phân khúc xe tải thùng</MenuItem>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            )}
            {showModeratorBoard && (
                <Menu>
                    <MenuItem >{props.data}</MenuItem>
                    <SubMenu title="Báo cáo & phân tích KD">
                        <SubMenu title="Nhập liệu">
                            <MenuItem>Nhu cầu thực tế
                        <Link to="/kinhdoanh/nhaplieu/nhucauthucte" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo KD">
                            <MenuItem>Báo cáo tổng quát
                        <Link to="/kinhdoanh/baocao/tongquatkd" />
                            </MenuItem>
                            <MenuItem>Báo cáo chi tiết
                        <Link to="/kinhdoanh/baocao/chitietkd" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Biểu đồ KD">
                            <MenuItem>Biểu đồ tổng quát
                        <Link to="/kinhdoanh/bieudokd/bieudotq" />
                            </MenuItem>
                            <MenuItem>Biểu đồ chi tiết
                        <Link to="/kinhdoanh/bieudokd/bieudoct" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Khách hàng">
                        <SubMenu title="Khởi tạo">
                            <MenuItem
                            >Khởi tạo KH
                        <Link to="/khachhang/khoitao" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo">
                            <MenuItem
                            >Danh sách KH
                        <Link to="/khachhang/danhsach" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Quản lý nhân sự">
                        <SubMenu title="Nhập liệu">
                            <MenuItem
                            >Khởi tạo nhân viên
                        <Link to="#" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo">
                            <MenuItem
                            >Tổng hợp DSNS
                        <Link to="#" />
                            </MenuItem>
                            <MenuItem
                            >Hồ sơ NV
                        <Link to="#" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Quản lý CV chi nhánh">
                        <SubMenu title="Báo cáo giao dịch với KH">
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                            <MenuItem>3 </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title="Phân tích dòng xe">
                        <SubMenu title="Nhập liệu">
                            <MenuItem>Phân khúc đầu kéo</MenuItem>
                            <MenuItem>Phân khúc Ben 3 chân</MenuItem>
                            <MenuItem>Phân khúc Ben 4 chân</MenuItem>
                            <MenuItem>Phân khúc xe tải thùng</MenuItem>
                        </SubMenu>
                        <SubMenu title="Báo cáo phân tích các dòng xe">
                            <MenuItem>Phân khúc đầu kéo</MenuItem>
                            <MenuItem>Phân khúc Ben 3 chân</MenuItem>
                            <MenuItem>Phân khúc Ben 4 chân</MenuItem>
                            <MenuItem>Phân khúc xe tải thùng</MenuItem>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            )}
        </ProSidebar>

    );
};
