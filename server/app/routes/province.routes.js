module.exports = (app) => {
  const provinces = require("../controllers/province.controller.js");

  var router = require("express").Router();

  router.get("/", provinces.findAll);

  router.get("/:id", provinces.findId);

  app.use("/api/provinces", router);
};
