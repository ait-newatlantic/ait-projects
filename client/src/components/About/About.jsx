import React from "react"

export default function About() {
    return (
        <div>
            <div className="custom">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Giới thiệu</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Phần mềm AIT</h6>
                        <p className="card-text">Việc quản lý hoạt động kinh doanh một (đơn lẻ) hoặc nhiều chi nhánh hoàn toàn bằng thủ công cần nhiều nguồn nhân lực, tốn thời gian, chi phí và dễ xảy ra sai sót.
                        Công ty CP NEWAIT hiểu được những khó khăn trên của Doanh nghiệp và đã phát triển phần mềm quản lý thêm các tính năng phù hợp với nhiều mô hình kinh doanh của Doanh nghiệp.
                                Các phần mềm quản lý của AIT có độ chính xác cao, nhiều tiện ích sẽ là công cụ đắc lực để thúc đẩy doanh số phát triển cho Doanh nghiệp.</p>
                        <p className="card-text">Phần mềm được phát triển nội bộ với mục đích để các chi nhánh nhập liệu các thông tin về nhu cầu thực tế trực tiếp trên mạng sau khi gặp khách hàng. Ngoài ra phần mềm có thể giúp phân tích, đánh giá tình hình kinh doanh của các chi nhánh nhằm làm tính hiệu quả trong công việc. </p>
                        <a href="/home" className="card-link">Trang chủ</a>
                        <a href="/support" className="card-link">Hỗ trợ</a>
                    </div>
                </div>
            </div>
        </div>
    )
}