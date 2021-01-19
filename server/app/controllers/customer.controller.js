const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

//ADMIN
// Create and Save a new Demands
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customer ||
    !req.body.customer_number ||
    !req.body.customer_area ||
    !req.body.customer_address ||
    !req.body.customer_type ||
    !req.body.employee) {
    res.status(400).send({
      message: { heading: "Oh snap! You got an error!", message: "Xin hãy điền đầy đủ thông tin: tên khách hàng, sđt, khu vực, loại khách hàng, mã số thuế khách hàng đối với doanh nghiệp!!!" }
    });
    return;
  }

  // Create a Customer
  const customer = {
    employee: req.body.employee,
    customer: req.body.customer,
    customer_number: req.body.customer_number,
    customer_taxcode: req.body.customer_taxcode,
    customer_type: req.body.customer_type,
    customer_address: req.body.customer_address,
    customer_representative: req.body.customer_representative,
    customer_representative_number: req.body.customer_representative_number,
    customer_representative_email: req.body.customer_representative_email,
    customer_area: req.body.customer_area,
  };

  // Save Customer in the database
  Customer.create(customer)
    .then(data => {
      res.send({ message: { heading: "Success !!!", message: "Form đã được gửi thành công" }, data: data });
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const employee = req.query.employee;
  return db.sequelize.query(` SELECT * FROM customers WHERE employee LIKE "%${employee}%" `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
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

exports.findOneCustomer = (req, res) => {
  const customer = req.query.customer;
  return db.sequelize.query(` SELECT * FROM customers WHERE customer="${customer}" `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const customer = {
    customer_representative: req.body.customer_representative,
    customer_representative_number: req.body.customer_representative_number,
    customer_representative_email: req.body.customer_representative_email,
  };

  Customer.update(customer, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: { heading: "Success !!!", message: "Form đã được cập nhật thành công" }
        });
      } else {
        res.status(400).send({
          message: { heading: "Oh snap! You got an error!", message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!` }
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });
};

exports.findQuantity = (req, res) => {
  employee = req.query.employee
  return db.sequelize.query(
    `SELECT
    SUM(employee LIKE '%NVL%') AS nvl,
    SUM(employee LIKE '%VUNGTAU%') AS vungtau,
    SUM(employee LIKE '%DONGNAI%') AS dongnai,
    SUM(employee LIKE '%QUANGTRI%') AS quangtri,
    SUM(employee LIKE '%PDA%') AS pda,
    SUM(employee LIKE '%TAYNINH%') AS tayninh,
    SUM(employee LIKE '%DALAK%') AS dalak,
    SUM(employee LIKE '%CANTHO%') AS cantho,
    SUM(employee LIKE '%BINHPHUOC%') AS binhphuoc,
    SUM(employee LIKE '%HUNGYEN%') AS hungyen,
    SUM(employee LIKE '%LAMDONG%') AS lamdong,
    SUM(employee LIKE '%DONGNAI%') AS dongnai,
    SUM(employee LIKE '%BINHDINH%') AS binhdinh,
    SUM(employee LIKE '%GIALAI%') AS gialai
    FROM customers`,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};





