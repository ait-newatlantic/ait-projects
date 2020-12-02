const db = require("../models");
const Demand = db.demand;
const Op = db.Sequelize.Op;

// Create and Save a new Demands
exports.create = (req, res) => {
    // Validate request check if any thing missing!!!
    if (!req.body.customer || !
      req.body.customer_number || 
      !req.body.customer_area ||
      !req.body.model ||
      !req.body.type) {
        res.status(400).send({
            message: "Xin vui lòng nhập thông tin khách hàng và thông tin xe đầy đủ!"
        });
        return;
    }

    // Create a Demand
    const demand = {
        date : req.body.date,
        employee : req.body.employee,
        employee_field : req.body.employee_field,
        model : req.body.model,
        type : req.body.type,
        quantity : req.body.quantity,
        status : req.body.status,
        customer : req.body.customer,
        customer_number : req.body.customer_number,
        customer_type : req.body.customer_type,
        customer_area : req.body.customer_area,
        customer_opinion : req.body.customer_opinion,
        customer_meeting : req.body.customer_meeting,
        customer_communication : req.body.customer_communication,
        color : req.body.color,
        note : req.body.note,
    };

    // Save Demand in the database
    Demand.create(demand)
        .then(data => {
            res.send({ message: "Sending form successfully!" });
            //res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Demand."
            });
        });
};

// Retrieve all Demands from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { employee : { [Op.like]: `%${id}%` } } : null;

    Demand.findAll({ where: condition })
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

// Find a single Demand with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Demand.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Demand with id=" + id
            });
        });
};

// Update a Demand by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (!req.body.date) {
        res.status(400).send({
            message: "Xin vui lòng nhập thông tin đầy đủ!"
        });
        return;
    }

    // Create a Demand
    const demand = {
        date : req.body.date,
        status : req.body.status,
        ait: req.body.ait,
        kmt:req.body.kmt,
        color : req.body.color,
        note : req.body.note,
    };

    Demand.update(demand, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Demand was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Demand with id=${id}. Maybe Demand was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Demand with id=" + id
        });
      });
  };

// Delete a Demand with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Demands from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Demands
exports.findAllPublished = (req, res) => {

};