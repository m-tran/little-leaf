const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/user-controllers");

router.post("/profile/new", createUser);

router.get("/profile", getUser);

// router.delete("/profile", deleteProfile);

module.exports = router;