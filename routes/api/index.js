const router = require("express").Router();

const playerRoutes = require("./players");

// routes

router.use("/players", playerRoutes);

module.exports = router;
