import React from "react"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import "./style.css"

export default function About() {
    return (
        <div>
            <header className="sticky">
                <Navbar />
            </header>
            <div class="about-section">
                <h1>Giới thiệu</h1>
                <p>Công ty cổ phần TMQT Tân Đại Tây Dương</p>
                <p>Đại lí phân phối độc quyền cho xe Kamaz tại thị trường Việt Nam - Kamaz là thương hiệu số 1 tại Nga.</p>
            </div>
            <div className="custom">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Phần mềm AIT</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Nội dung</p>
                                        <p class="text-muted f-w-400">Việc quản lý hoạt động kinh doanh một (đơn lẻ) hoặc nhiều chi nhánh hoàn toàn bằng thủ công cần nhiều nguồn nhân lực, tốn thời gian, chi phí và dễ xảy ra sai sót.
                                        Công ty CP NEWAIT hiểu được những khó khăn trên của Doanh nghiệp và đã phát triển phần mềm quản lý thêm các tính năng phù hợp với nhiều mô hình kinh doanh của Doanh nghiệp.
                                Các phần mềm quản lý của AIT có độ chính xác cao, nhiều tiện ích sẽ là công cụ đắc lực để thúc đẩy doanh số phát triển cho Doanh nghiệp.</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Mục đích</p>
                                        <p class="text-muted f-w-400">Phần mềm được phát triển nội bộ với mục đích để các chi nhánh nhập liệu các thông tin về nhu cầu thực tế trực tiếp trên mạng sau khi gặp khách hàng. Ngoài ra phần mềm có thể giúp phân tích, đánh giá tình hình kinh doanh của các chi nhánh nhằm làm tính hiệu quả trong công việc.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src="https://www.newatlantic.vn/images/it_service/slide5.jpg" class="img-thumbnail" alt="User-Profile-Image" /> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <Footer />
            </footer>
        </div>
    )
}