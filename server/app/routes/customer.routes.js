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

    router.get("/branch", customers.findCustomerWithConditions);

    router.get("/branch/hide", customers.findCustomerWithConditionsHide);

    router.get("/quantity", customers.findQuantity);

    router.get("/name", customers.findCustomerByName);

    router.get("/update", customers.findOne);

    router.put("/hide/:id", customers.hide);

    router.put("/unhide/:id", customers.unhide);

    router.put("/:id", customers.update);

    app.use('/api/customers', router);
};