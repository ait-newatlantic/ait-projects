module.exports = app => {
    const car_types = require("../controllers/car_type.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", car_types.create);
  
    // Retrieve all Tutorials
    router.get("/", car_types.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", car_types.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", car_types.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", car_types.delete);
  
    // Delete all Tutorials
    router.delete("/", car_types.deleteAll);
  
    app.use('/api/car_types', router);
  };