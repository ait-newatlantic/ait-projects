const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(cors())

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
force: true //will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    initial();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello Word" });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/branch.routes')(app);
require('./app/routes/province.routes')(app);
require('./app/routes/demand.routes')(app);
require('./app/routes/demand_history.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/business_type.routes')(app);
require('./app/routes/contact_type.routes')(app);
require('./app/routes/color.routes')(app);
require('./app/routes/demand_status.routes')(app);
require('./app/routes/customer_type.routes')(app);
require('./app/routes/car_type.routes')(app);
require('./app/routes/car_model.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderator"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
    Role.create({
        id: 4,
        name: "employee"
    });
    CustomerType.create({
        customer_type_id: 1,
        customer_type_name: "DỰ KIẾN"
    });
    CustomerType.create({
        customer_type_id: 2,
        customer_type_name: "TIỀM NĂNG"
    });
    CustomerType.create({
        customer_type_id: 3,
        customer_type_name: "ĐÃ SỬ DỤNG KAMAZ"
    });
    DemandStatus.create({
        demand_status_id: 1,
        demand_status_name: "TIẾP CẬN CHÀO HÀNG"
    });
    DemandStatus.create({
        demand_status_id: 2,
        demand_status_name: "CHẠY THỬ"
    });
    DemandStatus.create({
        demand_status_id: 3,
        demand_status_name: "ĐÀM PHÁN"
    });
    DemandStatus.create({
        demand_status_id: 4,
        demand_status_name: "CHỐT ĐƠN HÀNG"
    });
    DemandStatus.create({
        demand_status_id: 5,
        demand_status_name: "ĐÃ CỌC"
    });
    DemandStatus.create({
        demand_status_id: 6,
        demand_status_name: "LÊN HỢP ĐỒNG"
    });
    DemandStatus.create({
        demand_status_id: 7,
        demand_status_name: "ĐÃ THANH TOÁN TẠM ỨNG"
    });
    DemandStatus.create({
        demand_status_id: 8,
        demand_status_name: "BÀN GIAO CHƯA THANH TOÁN"
    });
    DemandStatus.create({
        demand_status_id: 9,
        demand_status_name: "HOÀN TẤT GIAO DỊCH"
    });
    DemandStatus.create({
        demand_status_id: 10,
        demand_status_name: "GIAO DỊCH THẤT BẠI"
    });
    ContactType.create({
        contact_type_id: 1,
        contact_type_name: "QUA ĐIỆN THOẠI"
    })
    ContactType.create({
        contact_type_id: 2,
        contact_type_name: "QUA EMAIL, ZALO,.."
    })
    ContactType.create({
        contact_type_id: 3,
        contact_type_name: "GẶP TRỰC TIẾP"
    })
    Color.create({
        color_id: 1,
        color_name: "Chưa quyết định"
    });
    Color.create({
        color_id: 2,
        color_name: "Cam"
    });
    Color.create({
        color_id: 3,
        color_name: "Trắng"
    });
    Color.create({
        color_id: 4,
        color_name: "Vàng"
    });
    Color.create({
        color_id: 5,
        color_name: "Xanh"
    });
    Color.create({
        color_id: 6,
        color_name: "Xanh quân đội"
    });
    Color.create({
        color_id: 7,
        color_name: "Đỏ"
    });
    Branch.create({
        branch_id: 1,
        branch_name: "AIT"
    });
    Branch.create({
        branch_id: 2,
        branch_name: "Đăk Lăk"
    });
    Branch.create({
        branch_id: 3,
        branch_name: "Phòng dự án"
    });
    Branch.create({
        branch_id: 4,
        branch_name: "Đồng Nai"
    });
    Branch.create({
        branch_id: 5,
        branch_name: "Quảng Trị"
    });
    Branch.create({
        branch_id: 6,
        branch_name: "Đà Nẵng"
    });
    Branch.create({
        branch_id: 7,
        branch_name: "Vũng Tàu"
    });
    Branch.create({
        branch_id: 8,
        branch_name: "Gia Lai"
    });
    Branch.create({
        branch_id: 9,
        branch_name: "Tây Ninh"
    });
    Branch.create({
        branch_id: 10,
        branch_name: "Lâm Đồng"
    });
    Branch.create({
        branch_id: 12,
        branch_name: "Cần Thơ"
    });
    Branch.create({
        branch_id: 13,
        branch_name: "Bình Phước"
    });
    Branch.create({
        branch_id: 14,
        branch_name: "Hưng Yên"
    });
    Branch.create({
        branch_id: 15,
        branch_name: "Bình Định"
    });
    Branch.create({
        branch_id: 16,
        branch_name: "Nguyễn Văn Linh"
    });
    Branch.create({
        branch_id: 17,
        branch_name: "Bình Dương"
    });
    Model.create({
        car_model_id: 1,
        car_model_name: "6460"
    });
    Model.create({
        car_model_id: 2,
        car_model_name: "6540"
    });
    Model.create({
        car_model_id: 3,
        car_model_name: "43253"
    });
    Model.create({
        car_model_id: 4,
        car_model_name: "43265"
    });
    Model.create({
        car_model_id: 5,
        car_model_name: "43266"
    });
    Model.create({
        car_model_id: 6,
        car_model_name: "53288"
    });
    Model.create({
        car_model_id: 7,
        car_model_name: "53229"
    });
    Model.create({
        car_model_id: 8,
        car_model_name: "65115"
    });
    Model.create({
        car_model_id: 9,
        car_model_name: "65116"
    });
    Model.create({
        car_model_id: 10,
        car_model_name: "65117"
    });
    Model.create({
        car_model_id: 11,
        car_model_name: "Cẩu 5-7 tấn"
    });
    Type.create({
        car_type_id: 1,
        car_type_name: "Xe Ben - OVAL"
    });
    Type.create({
        car_type_id: 2,
        car_type_name: "Xe Ben - VÁT"
    });
    Type.create({
        car_type_id: 3,
        car_type_name: "Xe tải thùng VN"
    });
    Type.create({
        car_type_id: 4,
        car_type_name: "Xe tải thùng nhập"
    });
    Type.create({
        car_type_id: 5,
        car_type_name: "Xe ben thùng Việt Nam"
    });
    Type.create({
        car_type_id: 6,
        car_type_name: "Xe tải gắn cẩu 5 tấn"
    });
    Type.create({
        car_type_id: 7,
        car_type_name: "Xe tải gắn cẩu 7 tấn"
    });
    Type.create({
        car_type_id: 8,
        car_type_name: "Xe tải gắn cẩu 8 tấn"
    });
    Type.create({
        car_type_id: 9,
        car_type_name: "Xe tải gắn cẩu 10 tấn"
    });
    Type.create({
        car_type_id: 10,
        car_type_name: "Xe cứu hỏa"
    });
    Type.create({
        car_type_id: 11,
        car_type_name: "Xe bồn chở xăng dầu"
    });
    Type.create({
        car_type_id: 12,
        car_type_name: "Xe bồn nước"
    });
    Type.create({
        car_type_id: 13,
        car_type_name: "Xe bồn nhựa đường"
    });
    Type.create({
        car_type_id: 14,
        car_type_name: "Xe đầu kéo"
    });
    Province.create({
        province_id: 1,
        province_name: "An Giang"
    });
    Province.create({
        province_id: 2,
        province_name: "Bà Rịa - Vũng Tàu"
    });
    Province.create({
        province_id: 3,
        province_name: "Bạc Liêu"
    });
    Province.create({
        province_id: 4,
        province_name: "Bắc Giang"
    });
    Province.create({
        province_id: 5,
        province_name: "Bắc Kạn"
    });
    Province.create({
        province_id: 6,
        province_name: "Bắc Ninh"
    });
    Province.create({
        province_id: 7,
        province_name: "Bến Tre"
    });
    Province.create({
        province_id: 8,
        province_name: "Bình Dương"
    });
    Province.create({
        province_id: 9,
        province_name: "Bình Định"
    });
    Province.create({
        province_id: 10,
        province_name: "Bình Phước"
    });
    Province.create({
        province_id: 11,
        province_name: "Bình Thuận"
    });
    Province.create({
        province_id: 12,
        province_name: "Cà Mau"
    });
    Province.create({
        province_id: 13,
        province_name: "Cao Bằng"
    });
    Province.create({
        province_id: 14,
        province_name: "Cần Thơ"
    });
    Province.create({
        province_id: 15,
        province_name: "Đà Nẵng"
    });
    Province.create({
        province_id: 16,
        province_name: "Đăk Lăk"
    });
    Province.create({
        province_id: 17,
        province_name: "Đăk Nông"
    });
    Province.create({
        province_id: 18,
        province_name: "Điện Biên"
    });
    Province.create({
        province_id: 19,
        province_name: "Đồng Nai"
    });
    Province.create({
        province_id: 20,
        province_name: "Đồng Tháp"
    });
    Province.create({
        province_id: 21,
        province_name: "Gia Lai"
    });
    Province.create({
        province_id: 22,
        province_name: "Hà Giang"
    });
    Province.create({
        province_id: 23,
        province_name: "Hà Nam"
    });
    Province.create({
        province_id: 24,
        province_name: "Hà Nội"
    });
    Province.create({
        province_id: 25,
        province_name: "Hà Tĩnh"
    });
    Province.create({
        province_id: 26,
        province_name: "Hải Dương"
    });
    Province.create({
        province_id: 27,
        province_name: "Hải Phòng"
    });
    Province.create({
        province_id: 28,
        province_name: "Hậu Giang"
    });
    Province.create({
        province_id: 29,
        province_name: "Hòa Bình"
    });
    Province.create({
        province_id: 30,
        province_name: "Thành phố Hồ Chí Minh"
    });
    Province.create({
        province_id: 31,
        province_name: "Hưng Yên"
    });
    Province.create({
        province_id: 32,
        province_name: "Khánh Hòa"
    });
    Province.create({
        province_id: 33,
        province_name: "Kiên Giang"
    });
    Province.create({
        province_id: 34,
        province_name: "Kon Tum"
    });
    Province.create({
        province_id: 35,
        province_name: "Lai Châu"
    });
    Province.create({
        province_id: 36,
        province_name: "Lạng Sơn"
    });
    Province.create({
        province_id: 37,
        province_name: "Lào Cai"
    });
    Province.create({
        province_id: 38,
        province_name: "Lâm Đồng"
    });
    Province.create({
        province_id: 39,
        province_name: "Long An"
    });
    Province.create({
        province_id: 40,
        province_name: "Nam Định"
    });
    Province.create({
        province_id: 41,
        province_name: "Nghệ An"
    });
    Province.create({
        province_id: 42,
        province_name: "Ninh Bình"
    });
    Province.create({
        province_id: 43,
        province_name: "Ninh Thuận"
    });
    Province.create({
        province_id: 44,
        province_name: "Phú Thọ"
    });
    Province.create({
        province_id: 45,
        province_name: "Phú Yên"
    });
    Province.create({
        province_id: 46,
        province_name: "Quảng Bình"
    });
    Province.create({
        province_id: 47,
        province_name: "Quảng Nam"
    });
    Province.create({
        province_id: 48,
        province_name: "Quảng Ngãi"
    });
    Province.create({
        province_id: 49,
        province_name: "Quảng Ninh"
    });
    Province.create({
        province_id: 50,
        province_name: "Quảng Trị"
    });
    Province.create({
        province_id: 51,
        province_name: "Sóc Trăng"
    });
    Province.create({
        province_id: 52,
        province_name: "Sơn La"
    });
    Province.create({
        province_id: 53,
        province_name: "Tây Ninh"
    });
    Province.create({
        province_id: 54,
        province_name: "Thái Bình"
    });
    Province.create({
        province_id: 55,
        province_name: "Thái Nguyên"
    });
    Province.create({
        province_id: 56,
        province_name: "Thanh Hóa"
    });
    Province.create({
        province_id: 57,
        province_name: "Thừa Thiên - Huế"
    });
    Province.create({
        province_id: 58,
        province_name: "Tiền Giang"
    });
    Province.create({
        province_id: 59,
        province_name: "Trà Vinh"
    });
    Province.create({
        province_id: 60,
        province_name: "Tuyên Quang"
    });
    Province.create({
        province_id: 61,
        province_name: "Vĩnh Long"
    });
    Province.create({
        province_id: 62,
        province_name: "Vĩnh Phúc"
    });
    Province.create({
        province_id: 63,
        province_name: "Yên Bái"
    });
    BusinessType.create({
        business_type_id: 1,
        business_type_name: "TƯ NHÂN"
    });
    BusinessType.create({
        business_type_id: 2,
        business_type_name: "DOANH NGHIỆP"
    });
}