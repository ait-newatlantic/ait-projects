module.exports = app => {
    const car_models = require("../controllers/car_model.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", car_models.create);
  
    // Retrieve all Tutorials
    router.get("/", car_models.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", car_models.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", car_models.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", car_models.delete);
  
    // Delete all Tutorials
    router.delete("/", car_models.deleteAll);
  
    app.use('/api/car_models', router);
  };