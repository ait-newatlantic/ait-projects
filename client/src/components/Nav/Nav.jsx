import React from "react"
import {FiAlignJustify} from 'react-icons/fi';

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <div className="container-fluid">
                {/* <button type="button" id="sidebarCollapse" className="btn btn-primary">
                    <i className="fa fa-bars"></i>
                    <span className="sr-only">Toggle Menu</span>
                </button> */}
                <button className="btn btn-light d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <FiAlignJustify/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Trang chủ</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/about">Giới thiệu</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/support">Hỗ trợ</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Đăng xuất</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}