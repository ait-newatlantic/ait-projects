module.exports = (app) => {
  const vehicles = require("../controllers/vehicle.controller.js");

  var router = require("express").Router();

  router.post("/", vehicles.create)

  router.put("/", vehicles.update);

  router.put("/status", vehicles.updateStatus);

  router.put("/description", vehicles.updateDescription);

  router.get("/", vehicles.findAll);

  router.get("/project/:id", vehicles.findWithProject);

  app.use("/api/vehicles", router);
};