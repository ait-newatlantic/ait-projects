module.exports = (app) => {
    const oil_import_report = require("../controllers/oilImportReport.controller.js");

    var router = require("express").Router();

    router.get("/", oil_import_report.findAll);

    router.get("/:id", oil_import_report.findWithProject);

    app.use("/api/oil_import_report", router);
};