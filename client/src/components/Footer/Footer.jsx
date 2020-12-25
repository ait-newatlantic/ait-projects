import React from 'react'
import "./style.css"

export default function Footer() {
    return (
        <div className="footer-custom">
            <footer className="bg-light text-center text-lg-start">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-left">
                            <h5 className="text-uppercase">Liên hệ  </h5>
                            Địa chỉ: A60 đường Phú Thuận, P.Phú Thuận, Quận 7, TP. Hồ Chí Minh
                            <br/>
                            Điện thoại : 028.3873.3686
                            <br/>
                            Fax: 028.3873.3500
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase mb-0">DANH MỤC</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="/home" className="text-dark">Trang chủ</a>
                                </li>
                                <li>
                                    <a href="/about" className="text-dark">Giới thiệu</a>
                                </li>
                                <li>
                                    <a href="/support" className="text-dark">Hỗ trợ</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">MXH</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="https://www.facebook.com/newait.kamaz" className="text-dark">Facebook</a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UCyDJ_4eE0k7R66dns8WZZWg" className="text-dark">Youtube</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3 text-white" style={{ background: "#24305E" }}>
                    © 2020 Copyright:
                        <a className="text-white" href="https://newatlantic.vn/"> NewAtlantic.vn</a>
                </div>
            </footer>
        </div>
    )
}