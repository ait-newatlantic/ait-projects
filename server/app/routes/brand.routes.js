module.exports = (app) => {
    const brand = require("../controllers/brand.controller.js");

    var router = require("express").Router();

    router.get("/", brand.findAll);

    app.use("/api/brands", router);
};