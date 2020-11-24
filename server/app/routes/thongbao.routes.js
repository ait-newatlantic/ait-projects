const mysql = require("mysql");
const config = require("../config/db.config.js");

const db = mysql.createConnection({
    user: config.USER,
    host: config.HOST,
    password: config.PASSWORD, 
    database: config.DB
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