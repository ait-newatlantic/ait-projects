module.exports = app => {
    const demands = require("../controllers/demand.controller.js");
  
    var router = require("express").Router();

    //ADMIN
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

    //MODERATOP
    router.get("/specific", demands.findAllSpecific);

    router.get("/date/specific", demands.findAllDateSpecific);

    router.get("/updateat/specific", demands.findAllUpdatedAtSpecific);

    router.get("/createat/specific", demands.findAllCreatedAtSpecific);

    router.get("/goat/specific", demands.findAllGoAtSpecific);

    router.get("/total/specific", demands.findAllTotalSpecific);

    router.get("/overall/specific", demands.findAllOverallSpecific);

    router.get("/allquantity/specific", demands.findAllQuantitySpecific);


    //TOGETHER
    router.get("/:id", demands.findOne);

    router.put("/:id", demands.update);
  
    router.delete("/:id", demands.delete);

    router.delete("/", demands.deleteAll);
  
    app.use('/api/demands', router);
  };