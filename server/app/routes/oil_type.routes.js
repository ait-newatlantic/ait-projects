module.exports = (app) => {
    const oil_type = require("../controllers/oil_type.controller.js");

    var router = require("express").Router();

    router.get("/", oil_type.findAll);

    app.use("/api/oil_types", router);
};