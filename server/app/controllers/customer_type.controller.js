const db = require("../models");
const CustomerType = db.customer_type;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    var condition = {
        customer_type_hide: {
            [Op.eq]: 0
        }
    };

    CustomerType.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving car_models."
            });
            console.log(err)
        });
};