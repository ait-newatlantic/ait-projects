import react from "react"
import Slider from "../Slider/Slider"

export default function Support () {
    return (
        <div>
            <Slider/>
            <div className="custom">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Hỗ trợ</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Phần mềm AIT</h6>
                        <p className="card-text">Thông tin liên hệ</p>
                        <p className="card-text">Nhân viên IT: Trần Hoàng Nam (22 tuổi)</p>
                        <p className="card-text">Số điện thoại: 0918.628.660</p>
                        <a href="/home" className="card-link">Trang chủ</a>
                        <a href="/support" className="card-link">Hỗ trợ</a>
                    </div>
                </div>
            </div>
        </div>
    )
}