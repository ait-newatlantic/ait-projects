const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Branch = db.branch;
const Model = db.car_model;
const Type = db.car_type;
const Province = db.province;
const BusinessType = db.business_type;
const CustomerType = db.customer_type;
const DemandStatus = db.demand_status;
const Color = db.color;
const ContactType = db.contact_type;

db.sequelize.sync();
// force: true //will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
//     initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello Word" });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/branch.routes")(app);
require("./app/routes/province.routes")(app);
require("./app/routes/demand.routes")(app);
require("./app/routes/demand_history.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/business_type.routes")(app);
require("./app/routes/contact_type.routes")(app);
require("./app/routes/color.routes")(app);
require("./app/routes/demand_status.routes")(app);
require("./app/routes/customer_type.routes")(app);
require("./app/routes/car_type.routes")(app);
require("./app/routes/car_model.routes")(app);
require("./app/routes/option.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user",
    });
    Role.create({
        id: 2,
        name: "moderator",
    });
    Role.create({
        id: 3,
        name: "admin",
    });
    Role.create({
        id: 4,
        name: "employee",
    });
    CustomerType.create({
        id: 1,
        name: "DỰ KIẾN",
    });
    CustomerType.create({
        id: 2,
        name: "TIỀM NĂNG",
    });
    CustomerType.create({
        id: 3,
        name: "ĐÃ SỬ DỤNG KAMAZ",
    });
    DemandStatus.create({
        id: 1,
        name: "TIẾP CẬN CHÀO HÀNG",
    });
    DemandStatus.create({
        id: 2,
        name: "CHẠY THỬ",
    });
    DemandStatus.create({
        id: 3,
        name: "ĐÀM PHÁN",
    });
    DemandStatus.create({
        id: 4,
        name: "CHỐT ĐƠN HÀNG",
    });
    DemandStatus.create({
        id: 5,
        name: "ĐÃ CỌC",
    });
    DemandStatus.create({
        id: 6,
        name: "LÊN HỢP ĐỒNG",
    });
    DemandStatus.create({
        id: 7,
        name: "ĐÃ THANH TOÁN TẠM ỨNG",
    });
    DemandStatus.create({
        id: 8,
        name: "BÀN GIAO CHƯA THANH TOÁN",
    });
    DemandStatus.create({
        id: 9,
        name: "HOÀN TẤT GIAO DỊCH",
    });
    DemandStatus.create({
        id: 10,
        name: "GIAO DỊCH THẤT BẠI",
    });
    ContactType.create({
        id: 1,
        name: "QUA ĐIỆN THOẠI",
    });
    ContactType.create({
        id: 2,
        name: "QUA EMAIL, ZALO,..",
    });
    ContactType.create({
        id: 3,
        name: "GẶP TRỰC TIẾP",
    });
    Color.create({
        id: 1,
        name: "Chưa quyết định",
    });
    Color.create({
        id: 2,
        name: "Cam",
    });
    Color.create({
        id: 3,
        name: "Trắng",
    });
    Color.create({
        id: 4,
        name: "Vàng",
    });
    Color.create({
        id: 5,
        name: "Xanh",
    });
    Color.create({
        id: 6,
        name: "Xanh quân đội",
    });
    Color.create({
        id: 7,
        name: "Đỏ",
    });
    Branch.create({
        id: 1,
        name: "AIT",
    });
    Branch.create({
        id: 2,
        name: "Đăk Lăk",
    });
    Branch.create({
        id: 3,
        name: "Phòng dự án",
    });
    Branch.create({
        id: 4,
        name: "Đồng Nai",
    });
    Branch.create({
        id: 5,
        name: "Quảng Trị",
    });
    Branch.create({
        id: 6,
        name: "Đà Nẵng",
    });
    Branch.create({
        id: 7,
        name: "Vũng Tàu",
    });
    Branch.create({
        id: 8,
        name: "Gia Lai",
    });
    Branch.create({
        id: 9,
        name: "Tây Ninh",
    });
    Branch.create({
        id: 10,
        name: "Lâm Đồng",
    });
    Branch.create({
        id: 12,
        name: "Cần Thơ",
    });
    Branch.create({
        id: 13,
        name: "Bình Phước",
    });
    Branch.create({
        id: 14,
        name: "Hưng Yên",
    });
    Branch.create({
        id: 15,
        name: "Bình Định",
    });
    Branch.create({
        id: 16,
        name: "Nguyễn Văn Linh",
    });
    Branch.create({
        id: 17,
        name: "Bình Dương",
    });
    Model.create({
        id: 1,
        name: "6460",
    });
    Model.create({
        id: 2,
        name: "6540",
    });
    Model.create({
        id: 3,
        name: "43253",
    });
    Model.create({
        id: 4,
        name: "43265",
    });
    Model.create({
        id: 5,
        name: "43266",
    });
    Model.create({
        id: 6,
        name: "53288",
    });
    Model.create({
        id: 7,
        name: "53229",
    });
    Model.create({
        id: 8,
        name: "65115",
    });
    Model.create({
        id: 9,
        name: "65116",
    });
    Model.create({
        id: 10,
        name: "65117",
    });
    Model.create({
        id: 11,
        name: "Cẩu 5-7 tấn",
    });
    Type.create({
        id: 1,
        name: "Xe Ben - OVAL",
    });
    Type.create({
        id: 2,
        name: "Xe Ben - VÁT",
    });
    Type.create({
        id: 3,
        name: "Xe tải thùng VN",
    });
    Type.create({
        id: 4,
        name: "Xe tải thùng nhập",
    });
    Type.create({
        id: 5,
        name: "Xe ben thùng Việt Nam",
    });
    Type.create({
        id: 6,
        name: "Xe tải gắn cẩu 5 tấn",
    });
    Type.create({
        id: 7,
        name: "Xe tải gắn cẩu 7 tấn",
    });
    Type.create({
        id: 8,
        name: "Xe tải gắn cẩu 8 tấn",
    });
    Type.create({
        id: 9,
        name: "Xe tải gắn cẩu 10 tấn",
    });
    Type.create({
        id: 10,
        name: "Xe cứu hỏa",
    });
    Type.create({
        id: 11,
        name: "Xe bồn chở xăng dầu",
    });
    Type.create({
        id: 12,
        name: "Xe bồn nước",
    });
    Type.create({
        id: 13,
        name: "Xe bồn nhựa đường",
    });
    Type.create({
        id: 14,
        name: "Xe đầu kéo",
    });
    Province.create({
        id: 1,
        name: "An Giang",
    });
    Province.create({
        id: 2,
        name: "Bà Rịa - Vũng Tàu",
    });
    Province.create({
        id: 3,
        name: "Bạc Liêu",
    });
    Province.create({
        id: 4,
        name: "Bắc Giang",
    });
    Province.create({
        id: 5,
        name: "Bắc Kạn",
    });
    Province.create({
        id: 6,
        name: "Bắc Ninh",
    });
    Province.create({
        id: 7,
        name: "Bến Tre",
    });
    Province.create({
        id: 8,
        name: "Bình Dương",
    });
    Province.create({
        id: 9,
        name: "Bình Định",
    });
    Province.create({
        id: 10,
        name: "Bình Phước",
    });
    Province.create({
        id: 11,
        name: "Bình Thuận",
    });
    Province.create({
        id: 12,
        name: "Cà Mau",
    });
    Province.create({
        id: 13,
        name: "Cao Bằng",
    });
    Province.create({
        id: 14,
        name: "Cần Thơ",
    });
    Province.create({
        id: 15,
        name: "Đà Nẵng",
    });
    Province.create({
        id: 16,
        name: "Đăk Lăk",
    });
    Province.create({
        id: 17,
        name: "Đăk Nông",
    });
    Province.create({
        id: 18,
        name: "Điện Biên",
    });
    Province.create({
        id: 19,
        name: "Đồng Nai",
    });
    Province.create({
        id: 20,
        name: "Đồng Tháp",
    });
    Province.create({
        id: 21,
        name: "Gia Lai",
    });
    Province.create({
        id: 22,
        name: "Hà Giang",
    });
    Province.create({
        id: 23,
        name: "Hà Nam",
    });
    Province.create({
        id: 24,
        name: "Hà Nội",
    });
    Province.create({
        id: 25,
        name: "Hà Tĩnh",
    });
    Province.create({
        id: 26,
        name: "Hải Dương",
    });
    Province.create({
        id: 27,
        name: "Hải Phòng",
    });
    Province.create({
        id: 28,
        name: "Hậu Giang",
    });
    Province.create({
        id: 29,
        name: "Hòa Bình",
    });
    Province.create({
        id: 30,
        name: "Thành phố Hồ Chí Minh",
    });
    Province.create({
        id: 31,
        name: "Hưng Yên",
    });
    Province.create({
        id: 32,
        name: "Khánh Hòa",
    });
    Province.create({
        id: 33,
        name: "Kiên Giang",
    });
    Province.create({
        id: 34,
        name: "Kon Tum",
    });
    Province.create({
        id: 35,
        name: "Lai Châu",
    });
    Province.create({
        id: 36,
        name: "Lạng Sơn",
    });
    Province.create({
        id: 37,
        name: "Lào Cai",
    });
    Province.create({
        id: 38,
        name: "Lâm Đồng",
    });
    Province.create({
        id: 39,
        name: "Long An",
    });
    Province.create({
        id: 40,
        name: "Nam Định",
    });
    Province.create({
        id: 41,
        name: "Nghệ An",
    });
    Province.create({
        id: 42,
        name: "Ninh Bình",
    });
    Province.create({
        id: 43,
        name: "Ninh Thuận",
    });
    Province.create({
        id: 44,
        name: "Phú Thọ",
    });
    Province.create({
        id: 45,
        name: "Phú Yên",
    });
    Province.create({
        id: 46,
        name: "Quảng Bình",
    });
    Province.create({
        id: 47,
        name: "Quảng Nam",
    });
    Province.create({
        id: 48,
        name: "Quảng Ngãi",
    });
    Province.create({
        id: 49,
        name: "Quảng Ninh",
    });
    Province.create({
        id: 50,
        name: "Quảng Trị",
    });
    Province.create({
        id: 51,
        name: "Sóc Trăng",
    });
    Province.create({
        id: 52,
        name: "Sơn La",
    });
    Province.create({
        id: 53,
        name: "Tây Ninh",
    });
    Province.create({
        id: 54,
        name: "Thái Bình",
    });
    Province.create({
        id: 55,
        name: "Thái Nguyên",
    });
    Province.create({
        id: 56,
        name: "Thanh Hóa",
    });
    Province.create({
        id: 57,
        name: "Thừa Thiên - Huế",
    });
    Province.create({
        id: 58,
        name: "Tiền Giang",
    });
    Province.create({
        id: 59,
        name: "Trà Vinh",
    });
    Province.create({
        id: 60,
        name: "Tuyên Quang",
    });
    Province.create({
        id: 61,
        name: "Vĩnh Long",
    });
    Province.create({
        id: 62,
        name: "Vĩnh Phúc",
    });
    Province.create({
        id: 63,
        name: "Yên Bái",
    });
    BusinessType.create({
        id: 1,
        name: "TƯ NHÂN",
    });
    BusinessType.create({
        id: 2,
        name: "DOANH NGHIỆP",
    });
}