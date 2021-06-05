const db = require("../models");
const CustomerType = db.customer_type;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    CustomerType.findAll({
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
                message: err.message || "Some error occurred while retrieving customer_types.",
            });
            console.log(err);
        });
};