const db = require("../models");
const Attendance = db.Attendance;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (req.body.arr && !req.body.arr.length) {
        res.status(400).send({
            message: {
                heading: "Oh snap! You got an error!",
                message: "Xin hãy điền đầy đủ thông tin!!!",
            },
        });
        return;
    }

    const initial = {
        arr: req.body.arr,
    };
    console.log(initial);
    // Save Attendances in the database
    const requestArr = initial.arr.map((item) => {
        return Attendance.create({
            userId: item.userId,
            projectId: item.projectId,
            available: item.available,
            hide: false,
        });
    });
    return Promise.all(requestArr)
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
                message: err.message || "Some error occurred while creating the attendances.",
            });
            console.log(err);
        });
};

exports.findAll = (req, res) => {
    Attendance.findAll({
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
                model: db.User,
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
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    Attendance.findAll({
        where: {
            projectId: {
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
                model: db.User,
                include: [
                    {
                        model: db.Role,
                    },
                ]
            },
        ]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Attendances with id=" + id,
            });
            console.log(err);
        });
};