module.exports = (app) => {
    const oil_export_report = require("../controllers/oilExportReport.controller.js");

    var router = require("express").Router();

    router.get("/", oil_export_report.findAll);

    app.use("/api/oil_export_report", router);
};