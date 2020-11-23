const db_info = require('../config/db.config')
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "namtran",
    host: "localhost",
    password: "123456",
    database: "ait"
});

module.exports = function (app) {
    app.post('/api/post/thongbao', (req, res) => {
        const content = req.body.content
        const employee = req.body.employee
        db.query
            ("INSERT INTO thongbao (content, employee) VALUES (?,?)",
                [content, employee], (err, result) => {
                    console.log(err);
                })
    })

    app.get('/api/get/thongbao', function (req, res) {
        const sqlSelect = `SELECT * FROM thongbao `
        db.query(sqlSelect, (err, result) => {
            res.send(result)
        })
    })

}