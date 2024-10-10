const express = require("express");
const {
  createExercise,
  getAllExercises,
  updateExercise,
  deleteExercise,
  getOneExercise,
} = require("../controllers/exerciseController");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = express.Router();

router.post("/", authenticateJWT, createExercise);
router.get("/", authenticateJWT, getAllExercises);
router.get("/:id", authenticateJWT, getOneExercise);
router.put("/:id", authenticateJWT, updateExercise);
router.delete("/:id", authenticateJWT, deleteExercise);

module.exports = router;

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create a new exercise
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [cardio, strength, flexibility]
 *     responses:
 *       201:
 *         description: Exercise created successfully
 *       400:
 *         description: Validation errors
 */
