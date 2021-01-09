import React from "react"
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import img from "../../static/imgs/hoangnam.jpg"
import "./style.css"

export default function Support() {
    return (
        <div>
            <div class="about-section">
                <h1>Liên hệ</h1>
                <p>Công ty cổ phần TMQT Tân Đại Tây Dương</p>
                <p>Đại lí phân phối độc quyền cho xe Kamaz tại thị trường Việt Nam - Kamaz là thương hiệu số 1 tại Nga.</p>
            </div>
            <div className="custom">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src={img} class="img-thumbnail" alt="User-Profile-Image" style={{height:"35vh"}}/> </div>
                                <h6 class="f-w-600" style={{ color: "white" }}>Trần Hoàng Nam</h6>
                                <p>Software Engineer</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Thông tin chung</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Ngày sinh</p>
                                        <h6 class="text-muted f-w-400">17/11/1998</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Giới tính</p>
                                        <h6 class="text-muted f-w-400">Nam</h6>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Thông tin liên hệ</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Email</p>
                                        <h6 class="text-muted f-w-400">nam.tran@newatlantic.vn</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Số điện thoại</p>
                                        <h6 class="text-muted f-w-400">0918628660</h6>
                                    </div>
                                </div>
                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                    <li><a href="https://www.facebook.com/nam.tranhoang.94651/" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><FacebookIcon /></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><TwitterIcon /></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><InstagramIcon /></a></li>
                                    <li><a href="https://github.com/namtrhg" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><GitHubIcon /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}