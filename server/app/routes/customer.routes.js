module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", customers.create);

  // Retrieve all Tutorials
  router.get("/", customers.findAll);
  
  router.get("/quantity", customers.findQuantity);

  // Retrieve a single Tutorial with id
  router.get("/info", customers.findOneCustomer);

  // Retrieve a single Tutorial with id
  router.get("/:id", customers.findOne);

  // Update a Tutorial with id
  router.put("/:id", customers.update);

  app.use('/api/customers', router);
};