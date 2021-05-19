const db = require("../models");
const Province = db.province;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Province.findAll({
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
                message: err.message || "Some error occurred while retrieving provinces."
            });
            console.log(err)
        });
};