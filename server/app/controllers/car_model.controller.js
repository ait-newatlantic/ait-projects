const db = require("../models");
const CarModel = db.car_model;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    var condition = {
        car_model_hide: {
            [Op.eq]: 0
        }
    };

    CarModel.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving car models."
            });
            console.log(err)
        });
};