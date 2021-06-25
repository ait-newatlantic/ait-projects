module.exports = (app) => {
    const options = require("../controllers/option.controller.js");

    var router = require("express").Router();

    router.get("/", options.findAll);

    app.use("/api/options", router);
};