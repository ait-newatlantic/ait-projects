const db = require("../models");
const BusinessType = db.business_type;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    BusinessType.findAll({
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
                message: err.message || "Some error occurred while retrieving business_types."
            });
            console.log(err)
        });
};