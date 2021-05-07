import React from "react"
import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
        <div className="page-wrap d-flex flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-1 d-block">404</span>
                        <div className="mb-4 lead">Trang bạn đang tìm kiếm không tồn tại</div>
                        <div className="mb-4 lead">Xin vui lòng quay lại sau</div>
                        <Link to="/home" className="btn btn-link">Quay lại trang chủ</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}