const db = require("../models");
const Car_Model = db.car_model;
const Op = db.Sequelize.Op;

// Create and Save a new Demands
exports.create = (req, res) => {
    // Validate request
    if (!req.body.model_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Car_Model
    const car_model = {
        model_name: req.body.model_name
    };

    // Save Car_Model in the database
    Car_Model.create(car_model)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Car_Model."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { model_name: { [Op.like]: `%${id}%` } } : null;

    Car_Model.findAll({ where: condition })
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

// Find a single Car_Model with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Car_Model.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Car_Model with id=" + id
            });
        });
};

// Update a Car_Model by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Car_Model.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Car_Model was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Car_Model with id=${id}. Maybe Car_Model was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Car_Model with id=" + id
        });
      });
  };

// Delete a Car_Model with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};