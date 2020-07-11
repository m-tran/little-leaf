const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const db = require("../models");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({ email: req.user.email, id: req.user.id });
});

router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => res.status(401).json(err));
});

router.post("/plant/schedule", (req, res) => {
  db.Plants.create({
    water: req.body.text,
    reminders: req.body.text,
  })
  .then((schedule) => {
    res.send(schedule);
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/user_data", (req, res) => {
  !req.user
    ? res.json({ msg: "no user present" })
    : res.json({ email: req.user.email, id: req.user.id });
});

module.exports = router;
