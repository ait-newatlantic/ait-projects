const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

// Create and Save a new Demands
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Customer
    const customer = {
        customer_name : req.body.customer_name,
        customer_number : req.body.customer_number,
        customer_representative : req.body.customer_representative,
        customer_representative_number : req.body.customer_representative_number,
        customer_representative_email : req.body.customer_representative_email,
        customer_area : req.body.customer_area,
        customer_taxcode : req.body.customer_taxcode,
        customer_type : req.body.customer_type,
        customer_address : req.body.customer_address,
    };

    // Save Customer in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { customer : { [Op.like]: `%${id}%` } } : null;

    Customer.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Customer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Customer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
  };

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};