module.exports = (app) => {
  const demands = require("../controllers/demand.controller.js");

  var router = require("express").Router();

  router.post("/", demands.create);

  router.put("/hide/:id", demands.hide);

  router.put("/unhide/:id", demands.unhide);

  router.put("/:id", demands.update);

  router.get("/branch/hide", demands.findDemandWithConditionsHide);

  router.get("/branch", demands.findDemandWithConditions);

  router.get("/demandstatuses", demands.findDemandStatusReport);

  router.get("/update", demands.findOne);

  app.use("/api/demands", router);
};
