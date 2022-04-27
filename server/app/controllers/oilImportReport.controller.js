const db = require("../models");
const OilImportReport = db.OilImportReport;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    OilImportReport.findAll({
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
                message: err.message || "Some error occurred while retrieving oil import report.",
            });
            console.log(err);
        });
};

exports.findWithProject = (req, res) => {
    const projectId = req.params.id;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    OilImportReport.findAll({
        where: {
            projectId: {
                [Op.eq]: projectId,
            },
            updatedAt: {
                [Op.between]: [from_date, to_date],
            },
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
                message: err.message || "Some error occurred while retrieving oil import report.",
            });
            console.log(err);
        });
};