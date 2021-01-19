const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Nhân viên");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin");
};

exports.employeeBoard = (req, res) => {
  res.status(200).send("Chuyên viên");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator");
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { username: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const user = {
    password: bcrypt.hashSync(req.body.password, 8),
  };

  User.update(user, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: { heading: "Success !!!", message: "Form đã được cập nhật thành công" }
        });
      } else {
        res.status(400).send({
          message: { heading: "Oh snap! You got an error!", message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!` }
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
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
    });
};

exports.findAllSpecific = (req, res) => {
  // const username = req.query.employee;
  const username = "NVL";
  return db.sequelize.query(` SELECT * FROM users WHERE username LIKE "%${username}%" `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};