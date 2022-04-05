const db = require("../models");
const Report = db.Report;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.damageDate ||
        !req.body.damageContent ||
        !req.body.vehicleId ||
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
    Report.create({
        damageDate: req.body.damageDate,
        damageContent: req.body.damageContent,
        vehicleId: req.body.vehicleId,
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
                message: err.message || "Some error occurred while creating the Report.",
            });
            console.log(err);
        });
};

exports.update = (req, res) => {
    Report.update({
        fixDate: req.body.fixDate,
        fixContent: req.body.fixContent,
        sparePartCode: req.body.sparePartCode,
        sparePartName: req.body.sparePartName,
        quantity: req.body.quantity,
        fixCrew: req.body.fixCrew,
        price: req.body.price,
        note: req.body.note,
        unitId: req.body.unitId
    }, {
        where: { id: req.body.reportId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: {
                        heading: "Success !!!",
                        message: "Form đã được cập nhật thành công",
                    },
                });
            } else {
                res.status(400).send({
                    message: {
                        heading: "Oh snap! You got an error!",
                        message: `Cannot update Report with id=${req.body.reportId}. Maybe Report was not found or req.body is empty!`,
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Vehicle with id=" + req.body.reportId + err,
            });
            console.log(err);
        });
};

exports.findAll = (req, res) => {
    Report.findAll({
        where: {
            hide: {
                [Op.eq]: 0,
            },
        },
        include: [
            {
                model: db.Project,
            },
            {
                model: db.Unit,
            },
            {
                model: db.Vehicle,
            },
        ]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving vehicles.",
            });
            console.log(err);
        });
};

exports.findWithDate = (req, res) => {
    const projectId = req.params.projectId;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    Report.findAll({
        where: {
            hide: {
                [Op.eq]: 0,
            },
            projectId: {
                [Op.eq]: projectId,
            },
            updatedAt: {
                [Op.between]: [from_date, to_date],
            },
        },
        include: [
            {
                model: db.Project,
            },
            {
                model: db.Unit,
            },
            {
                model: db.Vehicle,
            },
        ]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving vehicles.",
            });
            console.log(err);
        });
};

exports.findWithProject = (req, res) => {
    const id = req.params.id;
    const projectId = req.params.projectId;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    Report.findAll({
        where: {
            projectId: {
                [Op.eq]: projectId,
            },
            vehicleId: {
                [Op.eq]: id,
            },
            updatedAt: {
                [Op.between]: [from_date, to_date],
            },
        },
        include: [
            {
                model: db.Project,
            },
            {
                model: db.Unit,
            },
            {
                model: db.Vehicle,
            },
        ]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Reports with id=" + id,
            });
            console.log(err);
        });
};

exports.findWithId = (req, res) => {
    const id = req.params.id;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    Report.findAll({
        where: {
            vehicleId: {
                [Op.eq]: id,
            },
            updatedAt: {
                [Op.between]: [from_date, to_date],
            },
        },
        include: [
            {
                model: db.Project,
            },
            {
                model: db.Unit,
            },
            {
                model: db.Vehicle,
            },
        ]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Reports with id=" + id,
            });
            console.log(err);
        });
};