module.exports = app => {
    const provinces = require("../controllers/province.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", provinces.findAll);

    router.get("/info", provinces.findOneProvince);
  
    app.use('/api/provinces', router);
  };