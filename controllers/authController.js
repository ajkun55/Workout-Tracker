const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    res.send("Not valid info");
    return;
  }
  const errors = [];
  if (username && username.length < 3)
    errors.push("Username must be at least 3 characters.");
  if (username && username.length > 10)
    errors.push("Username cannot exceed 10 characters.");
  if (username && !username.match(/^[a-zA-Z0-9]+$/))
    errors.push("Username can only contain letters and numbers.");

  if (password && password.length < 6)
    errors.push("Password must be at least 6 characters.");
  if (password && password.length > 30)
    errors.push("Password cannot exceed 30 characters.");

  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) errors.push("Email is not valid");

  // check if email exists already
  const emailCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (emailCheck.rows.length) errors.push("That Email is already taken.");

  if (errors.length) {
    return res.json({ errors });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === "23505") {
      // unique violation
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!result.rows.length) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("ourWorkoutTrackerApp", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
