module.exports = app => {
    const demands = require("../controllers/demand.controller.js");
  
    var router = require("express").Router();

    router.post("/", demands.create);

    router.get("/", demands.findAll);

    router.get("/date", demands.findAllDate);

    router.get("/updateat", demands.findAllUpdatedAt);

    router.get("/createat", demands.findAllCreatedAt);

    router.get("/goat", demands.findAllGoAt);

    router.get("/total", demands.findAllTotal);
    
    router.get("/overall", demands.findAllOverall);

    router.get("/allmodels", demands.findAllModels);
    
    router.get("/allquantity", demands.findAllQuantity);

    router.get("/:id", demands.findOne);

    router.put("/:id", demands.update);
  
    app.use('/api/demands', router);
  };