const controller = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt");

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

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/test/technician",
        [authJwt.verifyToken, authJwt.isTechnician],
        controller.technicianBoard
    );

    app.get(
        "/api/test/manager",
        [authJwt.verifyToken, authJwt.isManager],
        controller.managerBoard
    );

    app.get(
        "/api/test/driver",
        [authJwt.verifyToken, authJwt.isDriver],
        controller.driverBoard
    );

    router.put("/user", controller.hide);

    router.put("/user/:id", controller.update);

    router.get("/user/:id", controller.findOne);

    router.get("/project/:id", controller.findWithProject);

    router.get("/project/attendance/:id", controller.findWithProjectAttendance);

    router.get("/", controller.findAll);

    app.use("/api/users", router);
};