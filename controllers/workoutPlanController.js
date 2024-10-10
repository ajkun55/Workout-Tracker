const pool = require("../db");

const createOrUpdateWorkoutPlan = async (req, res) => {
  const userId = req.user.id;
  const { exercises, date, time, weight, reps, sets } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO workout_plan (exercises, user_id, date,time, weight, reps, sets) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (exercises, user_id, date, time) 
            DO UPDATE SET weight = EXCLUDED.weight, reps = EXCLUDED.reps, sets = EXCLUDED.sets 
            RETURNING *`,
      [exercises, userId, date, time, weight, reps, sets]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getWorkoutPlan = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM workout_plan WHERE user_id = $1 ",
      [userId]
    );
    if (!result.rows.length) {
      return res.status(404).json({ message: "Workout Plan not found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteWorkoutPlan = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM workout_plan WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );
    if (!result.rows.length) {
      return res.status(404).json({ message: "Workout Plan not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrUpdateWorkoutPlan,
  getWorkoutPlan,
  deleteWorkoutPlan,
};
