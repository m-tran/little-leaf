const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../client/signup.html"));
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

router.get("/members", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/members.html"));
});

module.exports = router;
