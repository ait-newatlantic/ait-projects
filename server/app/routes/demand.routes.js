module.exports = app => {
    const demands = require("../controllers/demand.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", demands.create);
  
    // Retrieve all Tutorials
    router.get("/", demands.findAll);

    router.get("/info", demands.findAllSpecific);
  
    // Retrieve all demands by date range
    router.get("/date", demands.findAllDate);

    router.get("/updateat", demands.findAllUpdatedAt);

    router.get("/createat", demands.findAllCreatedAt);

    router.get("/goat", demands.findAllGoAt);

    router.get("/total", demands.findAllTotal);

    router.get("/overall", demands.findAllOverall);

    // Retrieve a single Tutorial with id
    router.get("/:id", demands.findOne);

    // Update a Tutorial with id
    router.put("/:id", demands.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", demands.delete);
  
    // Delete all Tutorials
    router.delete("/", demands.deleteAll);
  
    app.use('/api/demands', router);
  };