const db = require("../models");
const OilExportReport = db.OilExportReport;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.exportDate ||
        !req.body.exportPaper ||
        !req.body.amountBefore ||
        !req.body.amountAfter ||
        !req.body.quantity ||
        !req.body.trips ||
        !req.body.discount ||
        !req.body.consumption ||
        !req.body.price ||
        !req.body.note ||
        !req.body.oilTypeId ||
        !req.body.unitId ||
        !req.body.projectId ||
        !req.body.userId
    ) {
        res.status(400).send({
            message: {
                heading: "Oh snap! You got an error!",
                message: "Xin hãy điền đầy đủ thông tin của xe!!",
            },
        });
        return;
    }
    OilExportReport.create({
        exportDate: req.body.importDate,
        exportPaper: req.body.importPaper,
        amountBefore: req.body.amountBefore,
        amountAfter: req.body.amountAfter,
        quantity: req.body.quantity,
        trips: req.body.trips,
        discount: req.body.discount,
        consumption: req.body.consumption,
        price: req.body.price,
        note: req.body.note,
        oilTypeId: req.body.oilTypeId,
        unitId: req.body.unitId,
        projectId: req.body.projectId,
        userId: req.body.userId,
        hide: false,
    })
        .then((data) => {
            res.send({
                message: {
                    heading: "Success !!!",
                    message: "Form đã được gửi thành công",
                },
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Import Oil Report.",
            });
            console.log(err);
        });
};

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
                message: err.message || "Some error occurred while retrieving oil import report.",
            });
            console.log(err);
        });
};

exports.findWithProject = (req, res) => {
    const projectId = req.params.id;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    OilExportReport.findAll({
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