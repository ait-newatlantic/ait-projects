const db_info = require('../config/db.config')
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "namtran",
    host: "localhost",
    password: "123456",
    database: "ait"
});

module.exports = function (app) {
    app.post('/api/post/khachhang', (req, res) => {
        const customer = req.body.customer
        const customer_number = req.body.customer_number
        const customer_area = req.body.customer_area
        const customer_representative = req.body.customer_representative
        const customer_representative_number = req.body.customer_representative_number
        const customer_representative_email = req.body.customer_representative_email
        const customer_taxcode = req.body.customer_taxcode
        const customer_type = req.body.customer_type
        const customer_address = req.body.customer_address
        db.query
            ("INSERT INTO khachhang (customer, customer_number, customer_representative, customer_representative_number, customer_representative_email, customer_area, customer_taxcode, customer_type, customer_address) VALUES (?,?,?,?,?,?,?,?,?)",
                [customer, customer_number, customer_representative, customer_representative_number, customer_representative_email, customer_area, customer_taxcode, customer_type, customer_address], (err, result) => {
                    console.log(err);
                })
    })

    app.get('/api/get/khachhang', function (req, res) {
        const sqlSelect = `SELECT * FROM khachhang `
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get/khachhang/thongtin', function (req, res) {
        const customer = req.query.customer;
        const sqlSelect = `SELECT * FROM khachhang WHERE customer="${customer}"`
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

}