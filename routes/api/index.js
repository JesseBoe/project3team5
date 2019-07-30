const router = require("express").Router();
const teamRoutes = require("./teams");
const gameRoutes = require("./games");
const playerRoutes = require("./players");

// routes
router.use("/teams", teamRoutes);
router.use("/games", gameRoutes);
router.use("/players", playerRoutes);

module.exports = router;
