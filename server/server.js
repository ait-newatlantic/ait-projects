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
const Model = db.car_model;
const Customer = db.customer;
const Type = db.car_type;
const Province = db.province;
 
// db.sequelize.sync();
// force: true //will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

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
require('./app/routes/demand.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/car_model.routes')(app);
require('./app/routes/car_type.routes')(app);
require('./app/routes/province.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
//   Role.create({
//     id: 4,
//     name: "employee"
//   });
//   Model.create({
//     id: 1,
//     model_name: "6460"
//   });
//   Model.create({
//     id: 2,
//     model_name: "6540"
//   });
//   Model.create({
//     id: 3,
//     model_name: "43253"
//   });
//   Model.create({
//     id: 4,
//     model_name: "43265"
//   });
//   Model.create({
//     id: 5,
//     model_name: "43266"
//   });
//   Model.create({
//     id: 6,
//     model_name: "53288"
//   });
//   Model.create({
//     id: 7,
//     model_name: "53229"
//   });
//   Model.create({
//     id: 8,
//     model_name: "65115"
//   });
//   Model.create({
//     id: 9,
//     model_name: "65116"
//   });
//   Model.create({
//     id: 10,
//     model_name: "65117"
//   });
//   Model.create({
//     id: 11,
//     model_name: "Cẩu 5-7 tấn"
//   });
//   Type.create({
//     id: 1,
//     type_name: "Xe Ben - OVAL"
//   });
//   Type.create({
//     id: 2,
//     type_name: "Xe Ben - VÁT"
//   });
//   Type.create({
//     id: 3,
//     type_name: "Xe tải thùng VN"
//   });
//   Type.create({
//     id: 4,
//     type_name: "Xe tải thùng nhập"
//   });
//   Type.create({
//     id: 5,
//     type_name: "Xe ben thùng Việt Nam"
//   });
//   Type.create({
//     id: 6,
//     type_name: "Xe tải gắn cẩu 5 tấn"
//   });
//   Type.create({
//     id: 7,
//     type_name: "Xe tải gắn cẩu 7 tấn"
//   });
//   Type.create({
//     id: 8,
//     type_name: "Xe tải gắn cẩu 8 tấn"
//   });
//   Type.create({
//     id: 9,
//     type_name: "Xe tải gắn cẩu 10 tấn"
//   });
//   Type.create({
//     id: 10,
//     type_name: "Xe cứu hỏa"
//   });
//   Type.create({
//     id: 11,
//     type_name: "Xe bồn chở xăng dầu"
//   });
//   Type.create({
//     id: 12,
//     type_name: "Xe bồn nước"
//   });
//   Type.create({
//     id: 13,
//     type_name: "Xe bồn nhựa đường"
//   });
//   Type.create({
//     id: 14,
//     type_name: "Xe đầu kéo"
//   });
//   Province.create({
//     id: 1,
//     province_name: "An Giang"
//   });
//   Province.create({
//     id: 2,
//     province_name: "Bà Rịa - Vũng Tàu"
//   });
//   Province.create({
//     id: 3,
//     province_name: "Bạc Liêu"
//   });
//   Province.create({
//     id: 4,
//     province_name: "Bắc Giang"
//   });
//   Province.create({
//     id: 5,
//     province_name: "Bắc Kạn"
//   });
//   Province.create({
//     id: 6,
//     province_name: "Bắc Ninh"
//   });
//   Province.create({
//     id: 7,
//     province_name: "Bến Tre"
//   });
//   Province.create({
//     id: 8,
//     province_name: "Bình Dương"
//   });
//   Province.create({
//     id: 9,
//     province_name: "Bình Định"
//   });
//   Province.create({
//     id: 10,
//     province_name: "Bình Phước"
//   });
//   Province.create({
//     id: 11,
//     province_name: "Bình Thuận"
//   });
//   Province.create({
//     id: 12,
//     province_name: "Cà Mau"
//   });
//   Province.create({
//     id: 13,
//     province_name: "Cao Bằng"
//   });
//   Province.create({
//     id: 14,
//     province_name: "Cần Thơ"
//   });
//   Province.create({
//     id: 15,
//     province_name: "Đà Nẵng"
//   });
//   Province.create({
//     id: 16,
//     province_name: "Đăk Lăk"
//   });
//   Province.create({
//     id: 17,
//     province_name: "Đăk Nông"
//   });
//   Province.create({
//     id: 18,
//     province_name: "Điện Biên"
//   });
//   Province.create({
//     id: 19,
//     province_name: "Đồng Nai"
//   });
//   Province.create({
//     id: 20,
//     province_name: "Đồng Tháp"
//   });
//   Province.create({
//     id: 21,
//     province_name: "Gia Lai"
//   });
//   Province.create({
//     id: 22,
//     province_name: "Hà Giang"
//   });
//   Province.create({
//     id: 23,
//     province_name: "Hà Nam"
//   });
//   Province.create({
//     id: 24,
//     province_name: "Hà Nội"
//   });
//   Province.create({
//     id: 25,
//     province_name: "Hà Tĩnh"
//   });
//   Province.create({
//     id: 26,
//     province_name: "Hải Dương"
//   });
//   Province.create({
//     id: 27,
//     province_name: "Hải Phòng"
//   });
//   Province.create({
//     id: 28,
//     province_name: "Hậu Giang"
//   });
//   Province.create({
//     id: 29,
//     province_name: "Hòa Bình"
//   });
//   Province.create({
//     id: 30,
//     province_name: "Thành phố Hồ Chí Minh"
//   });
//   Province.create({
//     id: 31,
//     province_name: "Hưng Yên"
//   });
//   Province.create({
//     id: 32,
//     province_name: "Khánh Hòa"
//   });
//   Province.create({
//     id: 33,
//     province_name: "Kiên Giang"
//   });
//   Province.create({
//     id: 34,
//     province_name: "Kon Tum"
//   });
//   Province.create({
//     id: 35,
//     province_name: "Lai Châu"
//   });
//   Province.create({
//     id: 36,
//     province_name: "Lạng Sơn"
//   });
//   Province.create({
//     id: 37,
//     province_name: "Lào Cai"
//   });
//   Province.create({
//     id: 38,
//     province_name: "Lâm Đồng"
//   });
//   Province.create({
//     id: 39,
//     province_name: "Long An"
//   });
//   Province.create({
//     id: 40,
//     province_name: "Nam Định"
//   });
//   Province.create({
//     id: 41,
//     province_name: "Nghệ An"
//   });
//   Province.create({
//     id: 42,
//     province_name: "Ninh Bình"
//   });
//   Province.create({
//     id: 43,
//     province_name: "Ninh Thuận"
//   });
//   Province.create({
//     id: 44,
//     province_name: "Phú Thọ"
//   });
//   Province.create({
//     id: 45,
//     province_name: "Phú Yên"
//   });
//   Province.create({
//     id: 46,
//     province_name: "Quảng Bình"
//   });
//   Province.create({
//     id: 47,
//     province_name: "Quảng Nam"
//   });
//   Province.create({
//     id: 48,
//     province_name: "Quảng Ngãi"
//   });
//   Province.create({
//     id: 49,
//     province_name: "Quảng Ninh"
//   });
//   Province.create({
//     id: 50,
//     province_name: "Quảng Trị"
//   });
//   Province.create({
//     id: 51,
//     province_name: "Sóc Trăng"
//   });
//   Province.create({
//     id: 52,
//     province_name: "Sơn La"
//   });
//   Province.create({
//     id: 53,
//     province_name: "Tây Ninh"
//   });
//   Province.create({
//     id: 54,
//     province_name: "Thái Bình"
//   });
//   Province.create({
//     id: 55,
//     province_name: "Thái Nguyên"
//   });
//   Province.create({
//     id: 56,
//     province_name: "Thanh Hóa"
//   });
//   Province.create({
//     id: 57,
//     province_name: "Thừa Thiên - Huế"
//   });
//   Province.create({
//     id: 58,
//     province_name: "Tiền Giang"
//   });
//   Province.create({
//     id: 59,
//     province_name: "Trà Vinh"
//   });
//   Province.create({
//     id: 60,
//     province_name: "Tuyên Quang"
//   });
//   Province.create({
//     id: 61,
//     province_name: "Vĩnh Long"
//   });
//   Province.create({
//     id: 62,
//     province_name: "Vĩnh Phúc"
//   });
//   Province.create({
//     id: 63,
//     province_name: "Yên Bái"
//   });
// }