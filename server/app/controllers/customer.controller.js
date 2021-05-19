const db = require("../models");
const Op = db.Sequelize.Op;
const Customer = db.customer;

exports.create = (req, res) => {
    if (!req.body.name ||
        !req.body.number ||
        !req.body.address ||
        !req.body.provinceId ||
        !req.body.business_typeId ||
        !req.body.userId
    ) {
        res.status(400).send({
            message: {
                heading: "Oh snap! You got an error!",
                message: "Xin hãy điền đầy đủ thông tin: tên khách hàng, sđt, khu vực, loại khách hàng, mã số thuế khách hàng đối với doanh nghiệp!!!",
            },
        });
        return;
    }
    Customer.create({
            name: req.body.name,
            number: req.body.number,
            address: req.body.address,
            customer_manager: req.body.customer_manager,
            customer_manager_number: req.body.customer_manager_number,
            customer_manager_email: req.body.customer_manager_email,
            customer_taxcode: req.body.customer_taxcode,
            provinceId: req.body.provinceId,
            userId: req.body.userId,
            business_typeId: req.body.business_typeId,
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
                message: err.message || "Some error occurred while creating the Customer.",
            });
            console.log(err);
        });
};

exports.findAll = (req, res) => {
    Customer.findAll({
            include: [{
                    model: db.user,
                    include: [{
                            model: db.branch,
                            where: {
                                hide: {
                                    [Op.eq]: 0
                                }
                            },
                        },
                        {
                            model: db.role,
                            where: {
                                hide: {
                                    [Op.eq]: 0
                                }
                            },
                        },
                    ],
                },
                {
                    model: db.province,
                    where: {
                        hide: {
                            [Op.eq]: 0
                        }
                    },
                },
                {
                    model: db.business_type,
                    where: {
                        hide: {
                            [Op.eq]: 0
                        }
                    },
                },
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Customers",
            });
            console.log(err)
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Customer.findByPk(id, {
            include: [{
                    model: db.user,
                    where: {
                        hide: {
                            [Op.eq]: 0
                        }
                    },
                },
                {
                    model: db.province,
                    where: {
                        hide: {
                            [Op.eq]: 0
                        }
                    },
                },
                {
                    model: db.branch,
                    where: {
                        hide: {
                            [Op.eq]: 0
                        }
                    },
                },
                {
                    model: db.business_type,
                    where: {
                        hide: {
                            [Op.eq]: 0
                        }
                    },
                },
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id + err,
            });
        });
};

exports.findCustomerWithConditions = (req, res) => {
    const branch_name = req.body.branch_name;
    const province_name = req.body.province_name;
    const business_type_name = req.body.business_type_name;
    const username = req.body.username;
    const name = req.body.name;
    const hide = req.params.hide;
    Customer.findAll({
            where: [{
                name: {
                    [Op.eq]: name
                },
                hide: {
                    [Op.eq]: hide
                }
            }],
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                    model: db.user,
                    where: {
                        username: {
                            [Op.like]: username
                        },
                        hide: {
                            [Op.eq]: 0
                        },
                    },
                    include: [{
                        model: db.branch,
                        where: {
                            name: {
                                [Op.like]: branch_name
                            },
                            hide: {
                                [Op.eq]: 0
                            },
                        },
                    }, ],
                },
                {
                    model: db.province,
                    where: {
                        name: {
                            [Op.like]: province_name
                        },
                        hide: {
                            [Op.eq]: 0
                        },
                    },
                },
                {
                    model: db.business_type,
                    where: {
                        name: {
                            [Op.like]: business_type_name
                        },
                        hide: {
                            [Op.eq]: 0
                        },
                    },
                },
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Customers" + err,
            });
        });
};

exports.findCustomerByName = (req, res) => {
    const name = req.body.name;
    Customer.findAll({
            where: [{
                name: {
                    [Op.eq]: name
                }
            }],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Customer" + err,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Customer.update({
            customer_manager: req.body.customer_manager,
            customer_manager_number: req.body.customer_manager_number,
            customer_manager_email: req.body.customer_manager_email,
        }, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: {
                        heading: "Success !!!",
                        message: "Customer was updated successfully!",
                    },
                });
            } else {
                res.status(400).send({
                    message: {
                        heading: "Oh snap! You got an error!",
                        message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id,
            });
            console.log(err)
        });
};

exports.hide = (req, res) => {
    const id = req.params.id;
    const hide = req.params.hide;

    Customer.update({
            customer_hide: hide,
        }, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully!",
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id,
            });
            console.log(err)
        });
};