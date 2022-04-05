const db = require("../models");
const Brand = db.Brand;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Brand.findAll({
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
                message: err.message || "Some error occurred while retrieving Brands.",
            });
            console.log(err);
        });
};