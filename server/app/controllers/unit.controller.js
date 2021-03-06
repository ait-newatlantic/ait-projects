const db = require("../models");
const Unit = db.Unit;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Unit.findAll({
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
                message: err.message || "Some error occurred while retrieving units.",
            });
            console.log(err);
        });
};