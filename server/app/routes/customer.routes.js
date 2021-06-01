module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/", customers.create);

  router.put("/customer", customers.hide);

  router.put("/customer/:id", customers.update);

  router.get("/customer/:id", customers.findOne);

  router.get("/filters", customers.findWithFilters);

  router.get("/", customers.findAll);

  app.use("/api/customers", router);
};
