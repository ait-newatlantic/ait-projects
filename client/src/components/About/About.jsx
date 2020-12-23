import React from "react"
import Slider from "../Slider/Slider"

export default function About() {
    return (
        <div>
            <Slider />
            <div className="custom">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Giới thiệu</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Phần mềm AIT</h6>
                        <p className="card-text">Phần mềm AIT được phát triển nội bộ với mục đích để các chi nhánh nhập liệu các thông tin về nhu cầu thực tế trực tiếp trên mạng sau khi gặp khách hàng. Ngoài ra phần mềm có thể giúp phân tích, đánh giá tình hình kinh doanh của các chi nhánh nhằm làm tính hiệu quả trong công việc. </p>
                        <p className="card-text">Chúc mọi người có một ngày tốt lành.</p>
                        <a href="/home" className="card-link">Trang chủ</a>
                        <a href="/support" className="card-link">Hỗ trợ</a>
                    </div>
                </div>
            </div>
        </div>
    )
}