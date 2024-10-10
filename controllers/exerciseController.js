const pool = require("../db");

const createExercise = async (req, res) => {
  const { name, description, category, muscle_group } = req.body;
  const userId = req.user.id;
  if (
    !name ||
    !description ||
    !category ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof category !== "string" ||
    (muscle_group && typeof muscle_group !== "string")
  ) {
    res.send("Not valid info");
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO exercises (name, description, category,muscle_group , user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, category, muscle_group, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllExercises = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM exercises WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneExercise = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM exercises WHERE user_id = $1 and id = $2",
      [userId, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, muscle_group } = req.body;
  const userId = req.user.id;
  if (
    !name ||
    !description ||
    !category ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof category !== "string" ||
    (muscle_group && typeof muscle_group !== "string")
  ) {
    res.send("Not valid info");
    return;
  }

  try {
    const result = await pool.query(
      "UPDATE exercises SET name = $1, description = $2, category = $3, muscle_group = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
      [name, description, category, muscle_group, id, userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteExercise = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM exercises WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );
    if (!result.rows.length) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createExercise,
  getAllExercises,
  getOneExercise,
  updateExercise,
  deleteExercise,
};
