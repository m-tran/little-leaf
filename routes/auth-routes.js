const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {
  login,
  register,
  logout,
  getUser,
} = require("../controllers/auth-controllers");

// Login route
// Route: http://localhost:3000/auth/login
// Type: POST

router.post("/auth/login", passport.authenticate("local"), login);

// Register route
// Route: http://localhost:3000/auth/register
// Type: POST

router.post("/auth/register", register);

// Get user route
// Route: http://localhost:3000/auth/register
// Type: POST

router.get("/auth/user", getUser);

// Logout route
// Route: http://localhost:3000/auth/register
// Type: GET

router.get("/auth/logout", logout);

module.exports = router;