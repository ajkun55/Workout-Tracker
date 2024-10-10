const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const profileRoutes = require("./routes/profileRoutes");
const workoutPlanRoutes = require("./routes/workoutPlanRoutes");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for sensitive routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use("/auth/", limiter);

// Routes
app.use("/auth", authRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/profile", profileRoutes);
app.use("/workoutPlan", workoutPlanRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
