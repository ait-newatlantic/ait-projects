import React from "react";
import * as MaterialUIIcons from "@material-ui/icons/";

export default function DashBoard() {
  return (
    <div>
      <div className="row">
        <div className="col-sm justify-content-start">
          <h4 className="font-weight-bold text-dark text-left">TRANG CHỦ</h4>
          <h6 className="flex d-flex wrap font-weight-bold text-secondary text-left">
            Giới thiệu, tài liệu hướng dẫn sử dụng
          </h6>
        </div>
      </div>
      <div className="text-left">
        <h6>New Atlantic Software</h6>
        <p>
          New Atlantic Software là phần mềm kinh doanh được công ty cổ phần TMQT Tân Đại
          Tây Dương xây dựng và phát triển nhằm phục vụ cho các chi nhánh về
          việc nhập dữ liệu kinh doanh, tạo báo cáo, đồ thị, thống kê số liệu,
          xuất ra file excel. Phần mềm được xây dựng sử dụng các công nghệ hiện
          đại như React, Node, Sequelize, MySQL & MariaDB.
        </p>
        <div style={{ background: "#eef" }}>
          Nhấp vào nút <MaterialUIIcons.Menu /> ở góc ngoài cùng bên trái để mở
          thanh công cụ.
        </div>
        <br />
        <h6>Tài liệu hướng dẫn</h6>
        <ul>
          <li>
            <a
              href="https://drive.google.com/drive/folders/1hj3-80kXTfgWIJozqRcywqEwJQfL73JJ?usp=sharing"
              target="blank"
            >
              Tài liệu hướng dẫn sử dụng
            </a>
          </li>
        </ul>
        <h6>Hỗ trợ kỹ thuật</h6>
        <ul>
          <li>Di động: +84918628660 (Mr.Nam)</li>
          <li>Email: nam.tran@newatlantic.vn</li>
        </ul>
      </div>
    </div>
  );
}
