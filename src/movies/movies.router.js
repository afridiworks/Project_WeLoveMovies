const router = require("express").Router({ mergeParams: true });
const theaterRouter = require("../theaters/theaters.router");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
// const { route } = require("../app");

router.route("/").get(controller.list).all(methodNotAllowed);

router.use("/:movieId/theaters", theaterRouter);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
