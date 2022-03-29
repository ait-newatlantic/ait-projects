const db = require("../models");
const OilType = db.OilType;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    OilType.findAll({
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
                message: err.message || "Some error occurred while retrieving OilTypes.",
            });
            console.log(err);
        });
};