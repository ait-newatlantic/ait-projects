const db = require("../models");
const Vehicle = db.Vehicle;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name ||
        !req.body.brand ||
        !req.body.code ||
        !req.body.registryDate ||
        !req.body.plateNumber ||
        !req.body.createdYear
    ) {
        res.status(400).send({
            message: {
                heading: "Oh snap! You got an error!",
                message: "Xin hãy điền đầy đủ thông tin của xe!!",
            },
        });
        return;
    }
    Vehicle.create({
        name: req.body.name,
        brandId: req.body.brand,
        code: req.body.code,
        registryDate: req.body.registryDate,
        plateNumber: req.body.plateNumber,
        createdYear: req.body.createdYear,
        projectId: null,
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
                message: err.message || "Some error occurred while creating the Vehicle.",
            });
            console.log(err);
        });
};

exports.update = (req, res) => {
    Vehicle.update({
        projectId: req.body.projectId,
    }, {
        where: { id: req.body.id },
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
                        message: `Cannot update Demand with id=${req.body.id}. Maybe Vehicle was not found or req.body is empty!`,
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Vehicle with id=" + req.body.id + err,
            });
            console.log(err);
        });
};

exports.updateStatus = (req, res) => {
    Vehicle.update({
        isWorking: req.body.isWorking
    }, {
        where: { id: req.body.id },
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
                        message: `Cannot update Demand with id=${req.body.id}. Maybe Vehicle was not found or req.body is empty!`,
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Vehicle with id=" + req.body.id + err,
            });
            console.log(err);
        });
};

exports.updateDescription = (req, res) => {
    Vehicle.update({
        description: req.body.description,
    }, {
        where: { id: req.body.id },
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
                        message: `Cannot update Demand with id=${req.body.id}. Maybe Vehicle was not found or req.body is empty!`,
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Vehicle with id=" + req.body.id + err,
            });
            console.log(err);
        });
};

exports.findAll = (req, res) => {
    Vehicle.findAll({
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
                model: db.Brand,
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
    Vehicle.findAll({
        where: {
            projectId: {
                [Op.eq]: id,
            },
        },
        include: [
            {
                model: db.Project,
            },
            {
                model: db.Brand,
            },
        ]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Vehicles with id=" + id,
            });
            console.log(err);
        });
};