module.exports = (app) => {
  const car_type = require("../controllers/car_type.controller.js");

  var router = require("express").Router();

  router.get("/", car_type.findAll);

  app.use("/api/car-types", router);
};
