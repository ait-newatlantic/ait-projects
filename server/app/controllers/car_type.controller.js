const db = require("../models");
const Car_type = db.car_type;
const Op = db.Sequelize.Op;

// Create and Save a new Demands
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Car_type
    const car_type = {
        type_name: req.body.type_name
    };

    // Save Car_type in the database
    Car_type.create(car_type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Car_type."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { type_name: { [Op.like]: `%${id}%` } } : null;

    Car_type.findAll({ where: condition })
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

// Find a single Car_type with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Car_type.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Car_type with id=" + id
            });
        });
};

// Update a Car_type by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Car_type.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Car_type was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Car_type with id=${id}. Maybe Car_type was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Car_type with id=" + id
        });
      });
  };

// Delete a Car_type with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};