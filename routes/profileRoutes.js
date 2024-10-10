const express = require("express");
const {
  createOrUpdateProfile,
  getProfile,
} = require("../controllers/profileController");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = express.Router();

router.post("/", authenticateJWT, createOrUpdateProfile);
router.get("/", authenticateJWT, getProfile);

module.exports = router;
