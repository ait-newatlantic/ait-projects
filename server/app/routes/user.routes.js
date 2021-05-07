const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    var router = require("express").Router();
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/test/emp",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.employeeBoard
    );

    router.get("/", controller.findAll);

    router.get("/branch", controller.findUserWithConditions);

    router.get("/branch/hide", controller.findUserWithConditionsHide);

    router.get("/update", controller.findOne);

    router.put("/hide/:id", controller.hide);

    router.put("/unhide/:id", controller.unhide);

    router.put("/:id", controller.update);

    app.use('/api/users', router);
};