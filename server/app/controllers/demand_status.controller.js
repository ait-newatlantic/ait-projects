const db = require("../models");
const DemandStatus = db.demand_status;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    DemandStatus.findAll({
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
                message: err.message || "Some error occurred while retrieving demand_status."
            });
            console.log(err)
        });
};