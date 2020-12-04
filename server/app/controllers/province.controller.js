const db = require("../models");
const Province = db.province;
const Op = db.Sequelize.Op;

// Create and Save a new Demands
exports.create = (req, res) => {
    // Validate request
    if (!req.body.province_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Province
    const province = {
        province_name: req.body.province_name
    };

    // Save Province in the database
    Province.create(province)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Province."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { province_name: { [Op.like]: `%${id}%` } } : null;

    Province.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving car_models."
            });
        });
};

// Find a single Province with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Province.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Province with id=" + id
            });
        });
};

// Update a Province by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Province.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Province was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Province with id=${id}. Maybe Province was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Province with id=" + id
        });
      });
  };

// Delete a Province with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllYear = (req, res) => {

};