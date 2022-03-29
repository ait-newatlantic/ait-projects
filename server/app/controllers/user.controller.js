const db = require("../models");
var bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op;
const User = db.User;

exports.allAccess = (req, res) => {
    res.status(200).send("Public");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin");
};

exports.managerBoard = (req, res) => {
    res.status(200).send("Manager");
};

exports.technicianBoard = (req, res) => {
    res.status(200).send("Technician");
};

exports.driverBoard = (req, res) => {
    res.status(200).send("Driver");
};

exports.findAll = (req, res) => {
    User.findAll({
        order: [
            ["id", "DESC"]
        ],
        include: [
            {
                model: db.Role,
            },
            {
                model: db.Project,
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving demand_status.",
            });
            console.log(err);
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id, {
        include: [
            {
                model: db.Role,
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id,
            });
            console.log(err);
        });
};

exports.findWithProject = (req, res) => {
    const id = req.params.id;
    User.findAll({
        include: [
            {
                model: db.Project,
                where: {
                    id: {
                        [Op.eq]: id,
                    },
                },
            },
            {
                model: db.Role,
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Users with id=" + id,
            });
            console.log(err);
        });
};

exports.findWithProjectAttendance = (req, res) => {
    const id = req.params.id;
    User.findAll({
        include: [
            {
                model: db.Project,
                where: {
                    id: {
                        [Op.eq]: id,
                    },
                },
            },
            {
                model: db.Role,
                where: {
                    [Op.or]: [
                        { name: 'driver' },
                        { name: 'techinician' }
                    ]
                },
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Users with id=" + id,
            });
            console.log(err);
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.update({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: {
                        heading: "Success !!!",
                        message: "User đã được cập nhật thành công",
                    },
                });
            } else {
                res.status(400).send({
                    message: {
                        heading: "Oh snap! You got an error!",
                        message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating user with id=" + id,
            });
            console.log(err);
        });
};

exports.hide = (req, res) => {
    const id = req.query.id;
    const hide = req.query.hide;
    User.update({
        hide: hide,
    }, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "user was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete user with id=" + id,
            });
            console.log(err);
        });
};