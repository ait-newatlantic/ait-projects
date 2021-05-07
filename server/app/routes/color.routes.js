module.exports = app => {
    const colors = require("../controllers/color.controller.js");

    var router = require("express").Router();

    router.get("/", colors.findAll);

    app.use('/api/colors', router);
};