import React from 'react'
import "./style.css"

export default function Footer() {
    return (
        <div className="footer-custom">
            <footer class="bg-light text-center text-lg-start">
                <div class="container p-4">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 mb-4 mb-md-0 text-left">
                            <h5 class="text-uppercase">Liên hệ  </h5>
                            Địa chỉ: A60 đường Phú Thuận, P.Phú Thuận, Quận 7, TP. Hồ Chí Minh
                            <br/>
                            Điện thoại : 028.3873.3686
                            <br/>
                            Fax: 028.3873.3500
                        </div>

                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase mb-0">DANH MỤC</h5>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="/home" class="text-dark">Trang chủ</a>
                                </li>
                                <li>
                                    <a href="/about" class="text-dark">Giới thiệu</a>
                                </li>
                                <li>
                                    <a href="/support" class="text-dark">Hỗ trợ</a>
                                </li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">MXH</h5>

                            <ul class="list-unstyled mb-0">
                                <li>
                                    <a href="https://www.facebook.com/newait.kamaz" class="text-dark">Facebook</a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UCyDJ_4eE0k7R66dns8WZZWg" class="text-dark">Youtube</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="text-center p-3 text-white" style={{ background: "#24305E" }}>
                    © 2020 Copyright:
                        <a class="text-white" href="https://newatlantic.vn/"> NewAtlantic.vn</a>
                </div>
            </footer>
        </div>
    )
}