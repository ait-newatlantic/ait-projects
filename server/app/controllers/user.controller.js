const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
    res.status(200).send("Public");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator");
};

exports.employeeBoard = (req, res) => {
    res.status(200).send("Employee");
};

exports.findAll = (req, res) => {
    return db.sequelize.query(
        ` SELECT users.username, users.name, users.password, users.email, users.createdAt, users.user_hide, users.updatedAt, branches.branch_name,
            roles.name AS rolename
        FROM users 
        LEFT JOIN branches
        ON users.branchId = branches.branch_id
        LEFT JOIN user_roles
        ON users.id = user_roles.userId
        LEFT JOIN roles
        ON roles.id = user_roles.roleId
        WHERE users.user_hide = 0`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findOne = (req, res) => {
    const id = req.query.id;
    return db.sequelize.query(
        ` SELECT users.username, users.name, users.password, users.email, users.createdAt, users.user_hide, users.updatedAt, branches.branch_name,
        roles.name AS rolename
        FROM users 
        LEFT JOIN branches
        ON users.branchId = branches.branch_id
        LEFT JOIN user_roles
        ON users.id = user_roles.userId
        LEFT JOIN roles
        ON roles.id = user_roles.roleId
        WHERE users.id = "${id}"`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findUserWithConditions = (req, res) => {
    const branch_name = req.query.branch_name;
    return db.sequelize.query(
        ` SELECT users.id, users.username, users.name, users.password, users.email, users.createdAt, users.user_hide, users.updatedAt, branches.branch_name,
            roles.name AS rolename
            FROM users
            LEFT JOIN branches
            ON users.branchId = branches.branch_id
            LEFT JOIN user_roles
            ON users.id = user_roles.userId
            LEFT JOIN roles
            ON roles.id = user_roles.roleId
            WHERE branches.branch_name LIKE "%${branch_name}%" 
            AND users.user_hide = 0`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findUserWithConditionsHide = (req, res) => {
    const branch_name = req.query.branch_name;
    return db.sequelize.query(
        ` SELECT users.id, users.username, users.name, users.password, users.email, users.createdAt, users.user_hide, users.updatedAt, branches.branch_name,
            roles.name AS rolename
            FROM users
            LEFT JOIN branches
            ON users.branchId = branches.branch_id
            LEFT JOIN user_roles
            ON users.id = user_roles.userId
            LEFT JOIN roles
            ON roles.id = user_roles.roleId
            WHERE branches.branch_name LIKE "%${branch_name}%" 
            AND users.user_hide = 1`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.update = (req, res) => {
    const id = req.params.id;

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    };

    User.update(user, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: { heading: "Success !!!", message: "User đã được cập nhật thành công" }
                });
            } else {
                res.status(400).send({
                    message: { heading: "Oh snap! You got an error!", message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!` }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
            console.log(err)
        });
};

exports.hide = (req, res) => {
    const id = req.params.id;

    const user = {
        user_hide: 1
    };

    User.update(user, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
            console.log(err)
        });
};

exports.unhide = (req, res) => {
    const id = req.params.id;

    const user = {
        user_hide: 0
    };

    User.update(user, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
            console.log(err)
        });
};
