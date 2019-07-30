const router = require("express").Router();
const teamsController = require("../../controllers/teamsController");

// Matches with "/api/teams"
router.route("/")
  .get(teamsController.findAll)
  .post(teamsController.create);

// Matches with "/api/teams/:id"
router
  .route("/:id")
  .get(teamsController.findById)
  .put(teamsController.update)
  .delete(teamsController.remove);

module.exports = router;
