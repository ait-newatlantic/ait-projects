module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", customers.create);

    router.put("/hide/:id", customers.hide);

    router.put("/:id", customers.update);

    router.get("/branch", customers.findCustomerWithConditions);

    router.get("/name", customers.findCustomerByName);

    router.get("/:id", customers.findOne);

    router.get("/", customers.findAll);

    app.use('/api/customers', router);
};