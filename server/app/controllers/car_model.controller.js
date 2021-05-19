const db = require("../models");
const CarModel = db.car_model;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    CarModel.findAll({
            where: {
                hide: {
                    [Op.eq]: 0
                }
            }
        })
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