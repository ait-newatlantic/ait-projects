const db = require("../models");
const BusinessType = db.business_type;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    var condition = {
        business_type_hide: {
            [Op.eq]: 0
        }
    };

    BusinessType.findAll({ where: condition })
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

exports.findBusinessTypeByName = (req, res) => {
    const business_type_name = req.query.business_type_name;
    return db.sequelize.query(` SELECT * FROM business_types WHERE business_type_name="${business_type_name}" `, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};