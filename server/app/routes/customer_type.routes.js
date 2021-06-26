module.exports = (app) => {
  const customer_types = require("../controllers/customer_type.controller.js");

  var router = require("express").Router();

  router.get("/", customer_types.findAll);

  app.use("/api/customer-types", router);
};
