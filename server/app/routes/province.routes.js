module.exports = (app) => {
  const provinces = require("../controllers/province.controller.js");

  var router = require("express").Router();

  router.get("/", provinces.findAll);

  router.get("/info", provinces.findAll);

  app.use("/api/provinces", router);
};
