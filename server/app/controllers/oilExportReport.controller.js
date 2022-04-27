const db = require("../models");
const OilExportReport = db.OilExportReport;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    OilExportReport.findAll({
        where: {
            hide: {
                [Op.eq]: 0,
            },
        },
        include: [
            {
                model: db.OilType,
            },
            {
                model: db.Project,
            },
            {
                model: db.User,
            },
            {
                model: db.Unit,
            },
        ]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving oil export report.",
            });
            console.log(err);
        });
};