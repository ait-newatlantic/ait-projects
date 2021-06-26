module.exports = (app) => {
  const demand_statuses = require("../controllers/demand_status.controller.js");

  var router = require("express").Router();

  router.get("/", demand_statuses.findAll);

  app.use("/api/demand-statuses", router);
};
