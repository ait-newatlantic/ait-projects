module.exports = app => {
    const business_type = require("../controllers/business_type.controller.js");

    var router = require("express").Router();

    router.get("/", business_type.findAll);

    router.get("/name", business_type.findBusinessTypeByName);

    app.use('/api/business-types', router);
};