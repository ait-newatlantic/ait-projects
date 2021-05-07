module.exports = app => {
    const car_model = require("../controllers/car_model.controller.js");

    var router = require("express").Router();

    router.get("/", car_model.findAll);

    app.use('/api/car-models', router);
};