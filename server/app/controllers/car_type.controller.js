const db = require("../models");
const CarType = db.car_type;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    var condition = {
        car_type_hide: {
            [Op.eq]: 0
        }
    };

    CarType.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving car_types."
            });
            console.log(err)
        });
};