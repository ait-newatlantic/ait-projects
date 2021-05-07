module.exports = app => {
    const branches = require("../controllers/branch.controller.js");

    var router = require("express").Router();

    router.get("/", branches.findAll);

    router.get("/name", branches.findBranchByName);

    app.use('/api/branches', router);
};