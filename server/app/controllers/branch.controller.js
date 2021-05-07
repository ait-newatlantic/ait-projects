const db = require("../models");
const Branch = db.branch;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    var condition = {
        branch_hide: {
            [Op.eq]: 0
        }
    };

    Branch.findAll({ where: condition })
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

exports.findBranchByName = (req, res) => {
    const branch_name = req.query.branch_name;
    return db.sequelize.query(` SELECT * FROM branches WHERE branch_name="${branch_name}" `, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};