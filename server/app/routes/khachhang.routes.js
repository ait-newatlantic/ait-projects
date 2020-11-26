require('dotenv').config()
const mysql = require("mysql");
const config = require("../config/db.config.js");

const db = mysql.createPool({
    user: config.USER,
    host: config.HOST,
    password: config.PASSWORD, 
    database: config.DB,
    dialect: "mysql",
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
});

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
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

    app.get('/api/get/khachhang/id', function (req, res) {
        const id = req.query.id;
        const sqlSelect = `SELECT * FROM khachhang WHERE id=${id}`
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

    app.put('/api/update/khachhang', function (req, res) {
        const customer = req.body.customer
        const customer_number = req.body.customer_number
        const customer_representative = req.body.customer_representative
        const customer_representative_number = req.body.customer_representative_number
        const customer_representative_email = req.body.customer_representative_email
        const customer_area = req.body.customer_area
        const customer_taxcode = req.body.customer_taxcode
        const customer_type = req.body.customer_type
        const customer_address = req.body.customer_address
        const id = req.body.id
        const sqlUpdate = `
        UPDATE khachhang 
        SET 
            customer=?,
            customer_number=?,
            customer_representative=?, 
            customer_representative_number=?, 
            customer_representative_email=?,
            customer_area=?,
            customer_taxcode=?,
            customer_type=?,
            customer_address=?
        WHERE 
            id=?`
        db.query(sqlUpdate, [customer, customer_number, customer_representative, customer_representative_number, customer_representative_email, customer_area, customer_taxcode, customer_type, customer_address, id], (err, result) => {
            if (err) { console.log(err) }
        })
    })


}