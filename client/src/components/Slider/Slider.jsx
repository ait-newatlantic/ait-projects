import React from 'react'
import './style.css'
import slide1 from "../../../src/static/imgs/slide1.jpg"
import slide2 from "../../../src/static/imgs/slide2.jpg"
import slide3 from "../../../src/static/imgs/slide3.jpg"

export default function Slide() {
    return (
        <div className="slide">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={slide1} alt="First slide" />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>PHÂN TÍCH VÀ ĐÁNH GIÁ</h5>
                            <p>Chính xác và nhanh chóng</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={slide2} alt="Second slide" />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>NHẬP LIỆU</h5>
                            <p>Thuận tiện và tối ưu</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={slide3} alt="Third slide" />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>CÔNG NGHỆ HIỆN ĐẠI</h5>
                            <p>Bảo mật và an toàn</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}