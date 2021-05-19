const db = require("../models");
const ContactType = db.contact_type;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    ContactType.findAll({
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
                message: err.message || "Some error occurred while retrieving contact_types."
            });
            console.log(err)
        });
};