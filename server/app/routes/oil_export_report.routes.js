module.exports = (app) => {
    const oil_export_report = require("../controllers/oilExportReport.controller.js");

    var router = require("express").Router();

    router.post("/", oil_export_report.create);

    router.get("/", oil_export_report.findAll);

    router.get("/:id", oil_export_report.findWithProject);

    app.use("/api/oil_export_report", router);
};