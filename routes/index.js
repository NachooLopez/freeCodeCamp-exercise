const { Router } = require("express");
const {
  createUser,
  getUsers,
  createExercise,
  getLogs,
} = require("../controllers");
const { paramsVerifier } = require("../middlewares");

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/:_id/exercises", paramsVerifier, createExercise);
router.get("/:_id/logs", getLogs);

module.exports = router;
