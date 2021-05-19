const db = require("../models");
const Branch = db.branch;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Branch.findAll({
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
                message: err.message || "Some error occurred while retrieving car_models."
            });
            console.log(err)
        });
};