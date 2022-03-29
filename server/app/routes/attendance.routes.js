module.exports = (app) => {
    const attendances = require("../controllers/attendance.controller.js");

    var router = require("express").Router();

    router.post("/", attendances.create);

    router.get("/", attendances.findAll);

    router.get("/attendance/:id", attendances.findWithProject);

    app.use("/api/attendances", router);
};