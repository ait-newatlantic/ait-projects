const db = require("../models");
const Color = db.Color;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Color.findAll({
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
                message: err.message || "Some error occurred while retrieving colors.",
            });
            console.log(err);
        });
};