const mysql = require("mysql");
const config = require("../config/db.config.js");

const db = mysql.createConnection({
    user: config.USER,
    host: config.HOST,
    password: config.PASSWORD, 
    database: config.DB
});

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    
    app.post('/api/post/nhucauthucte', (req, res) => {
        const date = req.body.date
        const employee = req.body.employee
        const employee_field = req.body.employee_field
        const model = req.body.model
        const type = req.body.type
        const quantity = req.body.quantity
        const status = req.body.status
        const customer = req.body.customer
        const customer_number = req.body.customer_number
        const customer_type = req.body.customer_type
        const customer_area = req.body.customer_area
        const customer_opinion = req.body.customer_opinion
        const customer_meeting = req.body.customer_meeting
        const customer_communication = req.body.customer_communication
        const color = req.body.color
        const ait = req.body.ait
        const kmt = req.body.kmt
        const note = req.body.note
        db.query
            ("INSERT INTO nhucauthucte (date, employee, employee_field, model, type, quantity, status, customer, customer_number, customer_type, customer_area, customer_opinion, customer_meeting, customer_communication, color, ait, kmt, note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [date, employee, employee_field, model, type, quantity, status, customer, customer_number, customer_type, customer_area, customer_opinion, customer_meeting, customer_communication, color, ait, kmt, note], (err, result) => {
                    console.log(err);
                })
    })

    app.get('/api/get/nhucauthucte', function (req, res) {
        const sqlSelect = "SELECT * FROM nhucauthucte"
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get/nhucauthucte/nam', function (req, res) {
        const year = req.query.year;
        const sqlSelect = `SELECT * FROM nhucauthucte WHERE year=${year} `
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get/chinhanh', function (req, res) {
        const sqlSelect = "SELECT * FROM chinhanh"
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get/tinhthanh', function (req, res) {
        const sqlSelect = "SELECT * FROM tinhthanh"
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get/modelxe', function (req, res) {
        const sqlSelect = "SELECT * FROM modelxe"
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get/loaixe', function (req, res) {
        const sqlSelect = "SELECT * FROM loaixe"
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.put('/api/put/nhucauthucte', function (req, res) {
        const status = req.body.status;
        const sqlUpdate = `UPDATE nhucauthucte SET status =? WHERE status = ? `
        db.query(sqlUpdate, status, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get/nhucauthucte/id', function (req, res) {
        const id = req.query.id;
        const sqlSelect = `SELECT * FROM nhucauthucte WHERE id=${id}`
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.put('/api/update/nhucauthucte', function (req, res) {
        const status = req.body.status
        const ait = req.body.ait
        const kmt = req.body.kmt
        const note = req.body.note
        const id = req.body.id
        const sqlUpdate = `
        UPDATE nhucauthucte 
        SET 
            status=?,
            ait=?, 
            kmt=?, 
            note=? 
        WHERE 
            id=?`
        db.query(sqlUpdate, [status, ait, kmt, note, id], (err, result) => {
            if (err) { console.log(err) }
        })
    })

    app.get('/api/get/nhucauthucte/total', function (req, res) {
        const year = req.query.year;
        const sqlSelect = `SELECT 
         SUM(CASE WHEN YEAR(date)=${year} THEN quantity END) as tongcong,
         SUM(CASE WHEN YEAR(date)=${year} AND status="TIẾP CẬN CHÀO HÀNG" THEN quantity END) as tiepcanchaohang,
         SUM(CASE WHEN YEAR(date)=${year} AND status="CHẠY THỬ" THEN quantity END) as chaythu,
         SUM(CASE WHEN YEAR(date)=${year} AND status="ĐÀM PHÁN" THEN quantity END) as damphan,
         SUM(CASE WHEN YEAR(date)=${year} AND status="CHỐT ĐƠN HÀNG" THEN quantity END) as chotdonhang,
         SUM(CASE WHEN YEAR(date)=${year} AND status="ĐÃ CỌC" THEN quantity END) as dacoc,
         SUM(CASE WHEN YEAR(date)=${year} AND status="ĐÃ THANH TOÁN TẠM ỨNG" THEN quantity END) as dathanhtoantamung,
         SUM(CASE WHEN YEAR(date)=${year} AND status="HOÀN TẤT GIAO DỊCH" THEN quantity END) as hoantatgiaodich,
         SUM(CASE WHEN YEAR(date)=${year} AND status="LÊN HỢP ĐỒNG" THEN quantity END) as lenhopdong,
         SUM(CASE WHEN YEAR(date)=${year} AND status="BÀN GIAO CHƯA THANH TOÁN" THEN quantity END) as bangiaochuathanhtoan,
         SUM(CASE WHEN YEAR(date)=${year} AND status="GIAO DỊCH THẤT BẠI" THEN quantity END) as giaodichthatbai
         FROM nhucauthucte`;
        db.query(sqlSelect, (err, result) => {
            res.send(result);
        })
    })

    app.get('/api/get/nhucauthucte/bdtq', function (req, res) {
        const year = req.query.year;
        const sqlSelect = `SELECT 
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "1" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte1,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "1" THEN quantity END) as dukien1,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "2" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte2,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "2" THEN quantity END) as dukien2,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "3" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte3,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "3" THEN quantity END) as dukien3,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "4" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte4,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "4" THEN quantity END) as dukien4,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "5" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte5,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "5" THEN quantity END) as dukien5,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "6" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte6,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "6" THEN quantity END) as dukien6,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "7" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte7,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "7" THEN quantity END) as dukien7,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "8" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte8,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "8" THEN quantity END) as dukien8,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "9" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte9,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "9" THEN quantity END) as dukien9,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "10" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte10,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "10" THEN quantity END) as dukien10,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "11" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte11,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "11" THEN quantity END) as dukien11,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "12" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte12,
         SUM(CASE WHEN YEAR(date)= ${year} AND MONTH(date) = "12" THEN quantity END) as dukien12
         FROM nhucauthucte`;
        db.query(sqlSelect, (err, result) => {
            res.send(result);
        })
    })
}