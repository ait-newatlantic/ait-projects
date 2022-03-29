module.exports = (app) => {
    const units = require("../controllers/unit.controller.js");

    var router = require("express").Router();

    router.get("/", units.findAll);

    app.use("/api/units", router);
};