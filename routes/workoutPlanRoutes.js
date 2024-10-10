const express = require("express");
const {
  createOrUpdateWorkoutPlan,
  getWorkoutPlan,
  deleteWorkoutPlan,
} = require("../controllers/workoutPlanController");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = express.Router();

router.post("/", authenticateJWT, createOrUpdateWorkoutPlan);
router.get("/", authenticateJWT, getWorkoutPlan);
router.delete("/:id", authenticateJWT, deleteWorkoutPlan);

module.exports = router;
