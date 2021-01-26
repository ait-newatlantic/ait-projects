import car from "../../images/img1.svg";
import piggybank from "../../images/img2.svg";
import signup from "../../images/img3.svg";

export const homeObjOne = {
  id: "about",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "PHẦN MỀM DOANH NGHIỆP AIT",
  headline: "Mục tiêu phát triển",
  description:
    "Phần mềm được phát triển với mục tiêu để các chi nhánh có thể nhập liệu và tạo báo cáo hàng tuần trực tiếp trên phần mềm.",
  buttonLabel: "Bắt đầu",
  imgStart: false,
  img: car,
  alt: "Car",
  dark: true,
  primary: true,
  darkText: false,
};

export const homeObjTwo = {
  id: "discover",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "PHẦN MỀM DOANH NGHIỆP AIT",
  headline: "Truy cập mọi lúc, mọi nơi",
  description:
    "Giao diện phần mềm được xây dựng trên nền tảng React, Node, Express giúp người dùng có thể truy cập trên nhiều thiết bị khác nhau với tốc độ cao.",
  buttonLabel: "Tìm hiểu thêm",
  imgStart: true,
  img: piggybank,
  alt: "Piggybank",
  dark: false,
  primary: false,
  darkText: true,
};

export const homeObjThree = {
  id: "signup",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "PHẦN MỀM DOANH NGHIỆP AIT",
  headline: "Hỗ trợ 24/7",
  description:
    "Liên hệ: 0918.628.660 (Mr.Nam).",
  buttonLabel: "Tìm hiểu thêm",
  imgStart: false,
  img: signup,
  alt: "Papers",
  dark: false,
  primary: false,
  darkText: true,
};
