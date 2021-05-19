module.exports = (app) => {
  const branches = require("../controllers/branch.controller.js");

  var router = require("express").Router();

  router.get("/", branches.findAll);

  app.use("/api/branches", router);
};
