module.exports = app => {
    const demand_histories = require("../controllers/demand_history.controller.js");
  
    var router = require("express").Router();

    router.post("/", demand_histories.create);
  
    app.use('/api/demand_histories', router);
  };