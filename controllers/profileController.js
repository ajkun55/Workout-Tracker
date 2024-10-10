const pool = require("../db");

const createOrUpdateProfile = async (req, res) => {
  const userId = req.user.id;
  const { age, weight, fitnessGoals } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO user_profiles (user_id, age, weight, fitness_goals) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (user_id) 
            DO UPDATE SET age = EXCLUDED.age, weight = EXCLUDED.weight, fitness_goals = EXCLUDED.fitness_goals 
            RETURNING *`,
      [userId, age, weight, fitnessGoals]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM user_profiles WHERE user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createOrUpdateProfile, getProfile };
