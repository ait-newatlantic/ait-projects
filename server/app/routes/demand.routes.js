module.exports = (app) => {
  const demands = require("../controllers/demand.controller.js");

  var router = require("express").Router();

  router.post("/", demands.create);

  router.put("/demand", demands.hide);

  router.put("/demand/:id", demands.update);

  router.get("/demand/:id", demands.findOne);

  router.get("/filters", demands.findWithFilters);

  router.get("/demandstatuses", demands.findDemandStatusReport);

  router.get("/", demands.findAll);

  app.use("/api/demands", router);
};
