const db = require("../models");
const Project = db.Project;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Project.findAll({
        where: {
            hide: {
                [Op.eq]: 0,
            },
        },
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving projects.",
            });
            console.log(err);
        });
};