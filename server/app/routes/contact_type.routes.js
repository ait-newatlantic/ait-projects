module.exports = (app) => {
  const contact_types = require("../controllers/contact_type.controller.js");

  var router = require("express").Router();

  router.get("/", contact_types.findAll);

  app.use("/api/contact-types", router);
};
