const db = require("../models");
const Province = db.Province;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Province.findAll({
            where: {
                hide: {
                    [Op.eq]: 0,
                },
            },
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving provinces.",
            });
            console.log(err);
        });
};

exports.findByName = (req, res) => {
    const province_name = req.query.province_name;
    Province.findAll({
            where: {
                hide: {
                    [Op.eq]: 0,
                },
                name: {
                    [Op.eq]: province_name,
                },
            },
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving provinces.",
            });
            console.log(err);
        });
};