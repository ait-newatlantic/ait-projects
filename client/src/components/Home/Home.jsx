import React from "react";
import excel from "../../assets/img/excel.jpg";
import computer from "../../assets/img/computer.jpg";
import business from "../../assets/img/business.jpg";
import * as MaterialUIIcons from "@material-ui/icons/";

export default function DashBoard() {
  return (
    <div>
      <div className="row">
        <div className="col d-flex justify-content-start">
          <h4 className="font-weight-bold text-secondary text-left">
            TRANG CHỦ
          </h4>
        </div>
      </div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-interval="5000">
            <img src={excel} className="d-block w-50 mx-auto" alt="img1" />
            <div className="carousel-caption mx-auto text-warning">
              <h5 className="font-weight-bold">Xuất file báo cáo excel ?</h5>
              <p className="font-weight-bold">Đã có AIT-Software xử lý.</p>
            </div>
          </div>
          <div className="carousel-item" data-interval="5000">
            <img src={computer} className="d-block w-50 mx-auto" alt="img2" />
            <div className="carousel-caption mx-auto text-warning">
              <h5 className="font-weight-bold">
                Giải quyết công việc hiệu quả
              </h5>
              <p className="font-weight-bold ">Với AIT-Software.</p>
            </div>
          </div>
          <div className="carousel-item" data-interval="5000">
            <img src={business} className="d-block w-50 mx-auto" alt="img2" />
            <div className="carousel-caption mx-auto text-warning">
              <h5 className="font-weight-bold">Nâng cao hiệu quả kinh doanh</h5>
              <p className="font-weight-bold">Mọi dữ liệu đều được đồng bộ.</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <MaterialUIIcons.ArrowBackIos style={{ fill: "black" }} />
          </span>

          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span aria-hidden="true">
            <MaterialUIIcons.ArrowForwardIos style={{ fill: "black" }} />
          </span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
