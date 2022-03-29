module.exports = (app) => {
    const projects = require("../controllers/project.controller.js");

    var router = require("express").Router();

    router.get("/", projects.findAll);

    app.use("/api/projects", router);
};