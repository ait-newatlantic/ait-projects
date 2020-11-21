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
        const customer_name = req.body.customer_name
        const customer_number = req.body.customer_number
        const customer_area = req.body.customer_area
        const customer_taxcode = req.body.customer_taxcode
        const customer_type = req.body.customer_type
        const customer_opinion = req.body.customer_opinion
        const note = req.body.note
        db.query
            ("INSERT INTO khachhang (customer_name, customer_number, customer_area, customer_taxcode, customer_type, customer_opinion, note) VALUES (?,?,?,?,?,?,?)",
                [customer_name, customer_number, customer_area, customer_taxcode, customer_type, customer_opinion, note], (err, result) => {
                    console.log(err);
                })
    })

}