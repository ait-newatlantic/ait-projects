module.exports = (app) => {
    const reports = require("../controllers/report.controller.js");

    var router = require("express").Router();

    router.post("/", reports.create);

    router.put("/", reports.update);

    router.get("/", reports.findAll);

    router.get("/:id", reports.findWithId);

    router.get("/report/:projectId", reports.findWithDate);

    router.get("/report/:projectId/:id", reports.findWithProject);

    app.use("/api/reports", router);
};